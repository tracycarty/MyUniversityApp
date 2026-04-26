import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { name, email, password, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `User_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      userId,
    });

    await this.userRepository.save(user);

    return { message: 'Registration successful' };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string; message: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, userId: user.userId };
    const access_token = this.jwtService.sign(payload);

    return { access_token, message: 'Login successful' };
  }

  async getDashboard(userId: string): Promise<{ userId: string }> {
    return { userId };
  }
}