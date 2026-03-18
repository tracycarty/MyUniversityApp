import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getHome(@Res() response: Response) {
    return response.sendFile(join(process.cwd(), 'views', 'index.html'));
  }
}
