import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Doctor } from './doctor.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}





async createProfile(
  userId: number,
  dto: any,
) {
  const existingProfile =
    await this.doctorRepository.findOne({
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
      'Doctor profile already exists',
    );
  }

  const user =
    await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

  const profile =
    this.doctorRepository.create({
      ...dto,
      user,
    });

  return await this.doctorRepository.save(
    profile,
  );
}



async getProfile(userId: number) {
  const profile =
    await this.doctorRepository.findOne({
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
      'Doctor profile not found',
    );
  }

  return profile;
}




async updateProfile(
  userId: number,
  dto: any,
) {
  const profile =
    await this.doctorRepository.findOne({
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
      'Doctor profile not found',
    );
  }

  Object.assign(profile, dto);

  return await this.doctorRepository.save(
    profile,
  );
}


}

