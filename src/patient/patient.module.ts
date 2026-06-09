import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Patient } from './patient.entity';
import { User } from '../users/user.entity';

import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Patient,
      User,
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}