# Acceptance

## Acceptance Criteria for Post Creation

1. When a valid message is submitted to `POST /posts`, the API returns a new post object.
2. The returned post includes `id`, `message`, and `createdAt`.
3. The returned post does not include username or identity fields.
4. A created post becomes visible in `GET /posts`.

## Acceptance Criteria for Support Feed

1. `GET /posts` returns an array.
2. The array contains previously created posts.
3. Feed items contain timestamps.
4. Feed items remain anonymous.

## Acceptance Criteria for Reply Creation

1. When a valid message is submitted to `POST /posts/:id/replies`, the API returns a new reply object.
2. The reply includes `id`, `message`, and `createdAt`.
3. The reply does not include identity data.
4. The reply is associated with the correct post.

## Acceptance Criteria for Reply Retrieval

1. `GET /posts/:id/replies` returns an array.
2. The array contains replies only for the selected post.
3. Replies are returned in chronological insertion order.

## Acceptance Criteria for Validation

1. Blank messages are rejected.
2. Non-string messages are rejected.
3. Overlong messages are rejected.
4. Invalid request body shapes are rejected.
5. Reply operations for missing posts are rejected.

## Mapping to Future Tests

- Unit tests verify service and validation rules in isolation.
- Integration tests verify controller and service coordination.
- E2E tests verify real HTTP request and response behavior.
