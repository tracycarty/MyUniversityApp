import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Anonymous Support Platform (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(/Anonymous Support Feed/);
  });

  it('creates a post and returns anonymous post fields only', async () => {
    const response = await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'I feel overwhelmed today.' })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(Number),
      message: 'I feel overwhelmed today.',
      createdAt: expect.any(String),
    });
    expect(response.body).not.toHaveProperty('username');
    expect(response.body).not.toHaveProperty('email');
    expect(response.body).not.toHaveProperty('profile');
  });

  it('lists posts newest first without replies in the feed payload', async () => {
    await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'First post' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'Second post' })
      .expect(201);

    const response = await request(app.getHttpServer()).get('/posts').expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject({
      id: 2,
      message: 'Second post',
      createdAt: expect.any(String),
    });
    expect(response.body[1]).toMatchObject({
      id: 1,
      message: 'First post',
      createdAt: expect.any(String),
    });
    expect(response.body[0]).not.toHaveProperty('replies');
    expect(response.body[1]).not.toHaveProperty('replies');
  });

  it('creates replies for a post and lists only that post replies in insertion order', async () => {
    const firstPost = await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'Post needing support' })
      .expect(201);

    const secondPost = await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'Another post' })
      .expect(201);

    const firstReply = await request(app.getHttpServer())
      .post(`/posts/${firstPost.body.id}/replies`)
      .send({ message: 'You are not alone.' })
      .expect(201);

    const secondReply = await request(app.getHttpServer())
      .post(`/posts/${firstPost.body.id}/replies`)
      .send({ message: 'Take it one step at a time.' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/posts/${secondPost.body.id}/replies`)
      .send({ message: 'Reply for another post' })
      .expect(201);

    expect(firstReply.body).toEqual({
      id: expect.any(Number),
      message: 'You are not alone.',
      createdAt: expect.any(String),
    });
    expect(secondReply.body).toEqual({
      id: expect.any(Number),
      message: 'Take it one step at a time.',
      createdAt: expect.any(String),
    });

    const repliesResponse = await request(app.getHttpServer())
      .get(`/posts/${firstPost.body.id}/replies`)
      .expect(200);

    expect(repliesResponse.body).toEqual([
      {
        id: firstReply.body.id,
        message: 'You are not alone.',
        createdAt: expect.any(String),
      },
      {
        id: secondReply.body.id,
        message: 'Take it one step at a time.',
        createdAt: expect.any(String),
      },
    ]);
  });

  it('rejects invalid post bodies', async () => {
    await request(app.getHttpServer()).post('/posts').send('invalid').expect(400);

    await request(app.getHttpServer())
      .post('/posts')
      .send({})
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message must be a string.');
      });

    await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 123 })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message must be a string.');
      });

    await request(app.getHttpServer())
      .post('/posts')
      .send({ message: '   ' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message is required.');
      });

    await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'a'.repeat(501) })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message must be 500 characters or fewer.');
      });
  });

  it('rejects invalid reply bodies and invalid reply route params', async () => {
    const post = await request(app.getHttpServer())
      .post('/posts')
      .send({ message: 'Post for reply validation' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/posts/${post.body.id}/replies`)
      .send({ message: '   ' })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message is required.');
      });

    await request(app.getHttpServer())
      .post(`/posts/${post.body.id}/replies`)
      .send({ message: 'a'.repeat(501) })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toBe('Message must be 500 characters or fewer.');
      });

    await request(app.getHttpServer()).post('/posts/not-a-number/replies').send({
      message: 'You matter.',
    }).expect(400);

    await request(app.getHttpServer()).get('/posts/not-a-number/replies').expect(400);
  });

  it('returns not found for reply operations targeting a missing post', async () => {
    await request(app.getHttpServer())
      .post('/posts/999/replies')
      .send({ message: 'Support for a missing post' })
      .expect(404)
      .expect(({ body }) => {
        expect(body.message).toBe('Post with id 999 was not found.');
      });

    await request(app.getHttpServer())
      .get('/posts/999/replies')
      .expect(404)
      .expect(({ body }) => {
        expect(body.message).toBe('Post with id 999 was not found.');
      });
  });
});
