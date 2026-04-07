# Requirements

## Functional Requirements

### Posts

1. The system must allow a user to create an anonymous support post.
2. The system must return the created post with `id`, `message`, and `createdAt`.
3. The system must list posts in the support feed.
4. The post response must not expose identity data such as username, email, or profile fields.

### Replies

1. The system must allow a user to create a reply for an existing post.
2. The system must return the created reply with `id`, `message`, and `createdAt`.
3. The system must list replies for the selected post only.
4. Replies must not expose identity data.

### Validation

1. Request bodies must be objects.
2. `message` must be a string.
3. `message` must not be empty after trimming.
4. `message` must be 500 characters or fewer.
5. Invalid post ids must return an error when a reply is added or replies are requested.

## Non-Functional Requirements

1. API behavior should be predictable and easy to test with Jest and Supertest.
2. Timestamp fields should be returned in string form.
3. In-memory behavior should remain deterministic within a single test run.

## Testing Scope

### Unit

- service methods
- validation utility
- request pipes

### Integration

- controller to service interaction
- Nest module wiring for posts and replies

### E2E

- HTTP endpoints
- request validation
- response payload shape
- not found handling
