import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: any) {
    const existingUser =
      await this.userRepository.findOne({
        where: { email: dto.email },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });

    await this.userRepository.save(user);

    return {
      message: 'User registered successfully',
    };
  }

  async login(dto: any) {
    const user =
      await this.userRepository.findOne({
        where: { email: dto.email },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        dto.password,
        user.password,
      );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token:
        this.jwtService.sign(payload),
    };
  }
}