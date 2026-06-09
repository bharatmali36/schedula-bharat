import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Doctor } from './doctor.entity';

import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

import { User } from '../users/user.entity';

@Module({
imports: [
  TypeOrmModule.forFeature([
    Doctor,
    User,
  ]),
],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}