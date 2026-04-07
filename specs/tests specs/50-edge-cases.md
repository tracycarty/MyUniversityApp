# Edge Cases

## Message Validation Edge Cases

1. Request body is `null`
2. Request body is an array
3. Request body is a string instead of an object
4. `message` is missing
5. `message` is a number
6. `message` is whitespace only
7. `message` is exactly 500 characters
8. `message` is 501 characters
9. `message` contains leading and trailing spaces

## Post Retrieval Edge Cases

1. Feed is empty before any posts are created
2. Multiple posts are created in sequence and ordering must remain correct
3. Returned feed items should not expose nested `replies`

## Reply Edge Cases

1. Reply is added to a non-existent post id
2. Replies are requested for a non-existent post id
3. Replies are requested for a valid post with no replies yet
4. Multiple replies are added to one post and ordering must remain stable
5. Replies for one post must not appear under another post

## Route Parameter Edge Cases

1. Route id is not a number
2. Route id is negative
3. Route id is zero

## Test Design Notes

- Some route param cases depend on Nest's `ParseIntPipe` behavior.
- Negative and zero ids are parsed as integers, then fail later as not found.
- Ordering assertions should avoid depending on real clock timing when unit testing.
