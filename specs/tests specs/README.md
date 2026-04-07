# Student Min Spec for Testing

This folder adapts the student min-spec template structure to the current NestJS application.

Purpose:
- describe what should be tested
- define API expectations and invariants
- organize acceptance checks and edge cases
- prepare unit, integration, and E2E testing scope

This folder does not contain executable tests.
It is a planning and specification package only.

Current application scope:
- anonymous support posts
- anonymous replies for a specific post
- validation for message input

Current API surface:
- `POST /posts`
- `GET /posts`
- `POST /posts/:id/replies`
- `GET /posts/:id/replies`

Suggested future test layers:
- Unit: `PostsService`, `RepliesService`, validation utility, pipes
- Integration: controller + service flows inside Nest testing modules
- E2E: HTTP request/response behavior using Supertest

Related source files:
- `src/posts/posts.controller.ts`
- `src/posts/posts.service.ts`
- `src/replies/replies.controller.ts`
- `src/replies/replies.service.ts`
- `src/common/validation/message-validation.util.ts`
