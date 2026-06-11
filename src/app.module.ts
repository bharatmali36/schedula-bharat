import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AvailabilityModule } from './availability/availability.module';

import { User } from './users/user.entity';
import { Doctor } from './doctor/doctor.entity';
import { Patient } from './patient/patient.entity';
import { RecurringAvailability } from './availability/entities/recurring-availability.entity';
import { CustomAvailability } from './availability/entities/custom-availability.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl:
          configService.get('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,

        entities: [
          User,
          Doctor,
          Patient,
          RecurringAvailability,
          CustomAvailability,
        ],

        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    DoctorModule,
    PatientModule,
    AvailabilityModule,
  ],
})
export class AppModule {}