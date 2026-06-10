import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { DoctorQueryDto } from './dto/doctor-query.dto';
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

async findOne(id: number) {
const doctor =
  await this.doctorRepository.findOne({
    where: { id },
  });

if (!doctor) {
  throw new NotFoundException(
    'Doctor not found',
  );
}

return doctor;

}




async findAll(query: DoctorQueryDto) {
const page = Number(query.page) || 1;
const limit = Number(query.limit) || 10;
const skip = (page - 1) * limit;

if (page <= 0 || limit <= 0) {
  throw new BadRequestException(
    'Page and limit must be greater than 0',
  );
}
const queryBuilder =
  this.doctorRepository.createQueryBuilder('doctor');

if (query.specialization) {
  queryBuilder.andWhere(
    'LOWER(doctor.specialization) = LOWER(:specialization)',
    {
      specialization: query.specialization,
    },
  );
}

if (query.search) {
  queryBuilder.andWhere(
    'LOWER(doctor.fullName) LIKE LOWER(:search)',
    {
      search: `%${query.search}%`,
    },
  );
}



if (query.availability !== undefined) {
  queryBuilder.andWhere(
    'doctor.availability = :availability',
    {
      availability:
        query.availability === 'true',
    },
  );
}

queryBuilder.skip(skip);
queryBuilder.take(limit);

const [doctors, total] =
  await queryBuilder.getManyAndCount();

if (!doctors.length) {
  return {
    message: 'No doctors found',
    data: [],
  };
}
return {
  total,
  page,
  limit,
  data: doctors,
};







}


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

