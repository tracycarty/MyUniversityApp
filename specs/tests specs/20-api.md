# API

## Endpoints

### `POST /posts`

Creates an anonymous support post.

Request body:

```json
{
  "message": "I feel overwhelmed today."
}
```

Expected success shape:

```json
{
  "id": 1,
  "message": "I feel overwhelmed today.",
  "createdAt": "2026-03-31T00:00:00.000Z"
}
```

Validation expectations:
- rejects non-object bodies
- rejects missing `message`
- rejects non-string `message`
- rejects blank `message`
- rejects messages longer than 500 characters

### `GET /posts`

Returns the support feed.

Expected success shape:

```json
[
  {
    "id": 2,
    "message": "Second post",
    "createdAt": "2026-03-31T00:01:00.000Z"
  },
  {
    "id": 1,
    "message": "First post",
    "createdAt": "2026-03-31T00:00:00.000Z"
  }
]
```

Behavior notes:
- posts currently appear newest first
- response does not include `replies`

### `POST /posts/:id/replies`

Creates a reply for an existing post.

Request body:

```json
{
  "message": "You are not alone."
}
```

Expected success shape:

```json
{
  "id": 1,
  "message": "You are not alone.",
  "createdAt": "2026-03-31T00:02:00.000Z"
}
```

Validation expectations:
- same message validation rules as post creation
- rejects invalid numeric route params
- rejects post ids that do not exist

### `GET /posts/:id/replies`

Returns replies for one post.

Expected success shape:

```json
[
  {
    "id": 1,
    "message": "You are not alone.",
    "createdAt": "2026-03-31T00:02:00.000Z"
  }
]
```

Behavior notes:
- returns replies for the selected post only
- current service behavior preserves insertion order

## API Test Targets

- status codes for success and invalid input
- response payload shape
- timestamp presence
- anonymity of returned payloads
- not found behavior
- route param parsing
