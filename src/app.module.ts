import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { Doctor } from './doctor/doctor.entity';
import { Patient } from './patient/patient.entity';

import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  entities: [User, Doctor, Patient],
  synchronize: false,
}),
    AuthModule,
    DoctorModule,
    PatientModule,
  ],
})
export class AppModule {}