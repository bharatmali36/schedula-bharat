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

      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),

      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,

      database: process.env.DATABASE_NAME,

      entities: [
        User,
        Doctor,
        Patient,
      ],

      synchronize: false,
    }),

    AuthModule,
    DoctorModule,
    PatientModule,
  ],
})
export class AppModule {}