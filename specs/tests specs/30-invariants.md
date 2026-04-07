# Invariants

These rules should remain true across unit, integration, and E2E tests.

## Domain Invariants

1. A post always has `id`, `message`, and `createdAt`.
2. A reply always has `id`, `message`, and `createdAt`.
3. `createdAt` is produced at creation time.
4. Posts and replies are anonymous.
5. Identity fields must not appear in any post or reply response.

## Validation Invariants

1. Messages are trimmed before storage or return.
2. Empty messages are rejected.
3. Messages longer than 500 characters are rejected.
4. Request bodies that are not plain objects are rejected.
5. Route ids for reply endpoints must be valid integers.

## Data and Ordering Invariants

1. Post ids increment as posts are created.
2. Reply ids increment as replies are created.
3. Posts are currently returned in reverse creation order.
4. Replies are currently returned in creation order for the selected post.
5. Replies belong only to the post they were added to.

## Error Invariants

1. Looking up a missing post causes a not found error.
2. Reply operations for a missing post must fail.
3. Invalid input should fail before invalid data enters service state.
