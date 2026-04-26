import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  getHome(@Res() response: Response) {
    return response.sendFile(join(process.cwd(), 'views', 'index.html'));
  }

  @Get('login')
  getLogin(@Res() response: Response) {
    return response.sendFile(join(process.cwd(), 'views', 'login.html'));
  }

  @Get('register')
  getRegister(@Res() response: Response) {
    return response.sendFile(join(process.cwd(), 'views', 'register.html'));
  }

  @Get('dashboard')
  getDashboardPage(@Res() response: Response) {
    return response.sendFile(join(process.cwd(), 'views', 'dashboard.html'));
  }
}
