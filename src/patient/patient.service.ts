import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Patient } from './patient.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


async createProfile(
  userId: number,
  dto: any,
) {
  const existingProfile =
    await this.patientRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
  user: true,
},
    });

  if (existingProfile) {
    throw new ConflictException(
      'Patient profile already exists',
    );
  }

  const user =
    await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

  const profile =
    this.patientRepository.create({
      ...dto,
      user,
    });

  return await this.patientRepository.save(
    profile,
  );
}


async getProfile(userId: number) {
  const profile =
    await this.patientRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
  user: true,
},
    });

  if (!profile) {
    throw new NotFoundException(
      'Patient profile not found',
    );
  }

  return profile;
}


async updateProfile(
  userId: number,
  dto: any,
) {
  const profile =
    await this.patientRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
  user: true,
},
    });

  if (!profile) {
    throw new NotFoundException(
      'Patient profile not found',
    );
  }

  Object.assign(profile, dto);

  return await this.patientRepository.save(
    profile,
  );
}

}