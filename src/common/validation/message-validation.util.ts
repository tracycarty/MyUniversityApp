import { BadRequestException } from '@nestjs/common';

export function validateAnonymousMessage(body: unknown): string {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new BadRequestException('Request body must be an object.');
  }

  const { message } = body as { message?: unknown };

  if (typeof message !== 'string') {
    throw new BadRequestException('Message must be a string.');
  }

  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw new BadRequestException('Message is required.');
  }

  if (trimmedMessage.length > 500) {
    throw new BadRequestException('Message must be 500 characters or fewer.');
  }

  return trimmedMessage;
}
