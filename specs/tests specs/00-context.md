# Context

## Project

Anonymous Emotional Support Platform

## Goal

Provide a backend where users can:
- create anonymous support posts
- view the support feed
- reply to a specific post
- view replies for a specific post

## Current Technical Context

- Framework: NestJS
- Language: TypeScript
- Test tooling available in `package.json`: Jest, ts-jest, Supertest, `@nestjs/testing`
- Data storage: in-memory arrays inside services
- Validation style: custom pipe and shared validation utility

## Current Domain Model

### SupportPost

- `id: number`
- `message: string`
- `createdAt: string`
- `replies: SupportReply[]`

### SupportReply

- `id: number`
- `message: string`
- `createdAt: string`

## Testing Intent

This specification defines what should be covered later by:
- test framework setup
- unit tests
- integration tests
- E2E tests

No tests should be run at this stage.
