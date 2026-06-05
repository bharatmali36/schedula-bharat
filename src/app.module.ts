import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

import { DoctorController } from './doctor/doctor.controller';
import { PatientController } from './patient/patient.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'schedula_db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [
    DoctorController,
    PatientController,
  ],
})
export class AppModule {}