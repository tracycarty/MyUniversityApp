# Decisions

## Decision 1

Use the student min-spec structure as a testing preparation artifact instead of writing tests immediately.

Reason:
- the user asked for preparation, not execution
- this keeps testing scope clear before code generation

## Decision 2

Base the testing plan on the current implemented API, not only the feature description.

Reason:
- the application already exposes concrete endpoints and validation behavior
- test planning should match real code paths

## Decision 3

Separate test planning into unit, integration, and E2E levels.

Reason:
- service logic, controller wiring, and HTTP behavior each have different risks
- the codebase already supports Jest and Supertest

## Decision 4

Treat anonymity as a core invariant in every layer.

Reason:
- anonymity is central to the app purpose
- response payloads should never expose identity-related fields

## Decision 5

Document current ordering behavior as part of the spec.

Reason:
- posts are returned newest first
- replies are returned in insertion order
- explicit documentation prevents accidental regressions later
