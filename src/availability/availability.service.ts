import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring.dto';
import { CreateOverrideDto } from './dto/create-override.dto';
import { isOverlapping } from './utils/overlap.validator';
import { isValidTimeRange } from './utils/time.validator';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Doctor } from '../doctor/doctor.entity';



@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,

    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}


  async getRecurring(doctorId: number) {
  return this.recurringRepo.find({
    where: { doctorId },
    order: { dayOfWeek: 'ASC' },
  });
}
 


async createRecurring(
  doctorId: number,
  dto: CreateRecurringAvailabilityDto,
) {
  // 0. Verify doctor exists
  const doctor = await this.doctorRepo.findOne({
    where: { id: doctorId },
  });

  if (!doctor) {
    throw new NotFoundException('Doctor not found');
  }

  // 1. Validate time range
  if (!isValidTimeRange(dto.startTime, dto.endTime)) {
throw new BadRequestException('Invalid time range');
  }

  // 2. Fetch existing slots for same doctor + day
  const existing = await this.recurringRepo.find({
    where: {
      doctorId,
      dayOfWeek: dto.dayOfWeek,
    },
  });

  // 3. Check overlap
  for (const slot of existing) {
    if (
      isOverlapping(
        dto.startTime,
        dto.endTime,
        slot.startTime,
        slot.endTime,
      )
    ) {
    throw new BadRequestException(
  'Time slot overlaps with existing availability',
);
    }
  }

  // 4. Save
  const availability = this.recurringRepo.create({
    doctorId,
    ...dto,
  });

  return this.recurringRepo.save(availability);
}


 async createOverride(doctorId: number, dto: CreateOverrideDto) {
  // 0. Verify doctor exists
  const doctor = await this.doctorRepo.findOne({
    where: { id: doctorId },
  });

  if (!doctor) {
    throw new NotFoundException('Doctor not found');
  }

  // 1. Validate time range
  if (!isValidTimeRange(dto.startTime, dto.endTime)) {
    throw new BadRequestException('Invalid time range');
  }

  // 2. Check duplicate override for same date
  const existing = await this.customRepo.findOne({
    where: {
      doctorId,
      date: dto.date,
      startTime: dto.startTime,
      endTime: dto.endTime,
    },
  });

  if (existing) {
    throw new BadRequestException('Duplicate override already exists');
  }

  // 3. Save override
  const override = this.customRepo.create({
    doctorId,
    ...dto,
  });

  return this.customRepo.save(override);
}


async getAvailabilityByDate(doctorId: number, date: string) {
  const dayOfWeek = new Date(date)
    .toLocaleString('en-US', { weekday: 'long' })
    .toUpperCase();

  // 1. Check override first
  const override = await this.customRepo.find({
    where: { doctorId, date },
  });

  if (override.length > 0) {
    return {
      date,
      source: 'OVERRIDE',
      slots: override,
    };
  }

  // 2. If no override → get recurring
//   const recurring = await this.recurringRepo.find({
//     where: { doctorId, dayOfWeek },
//   });

const recurring = await this.recurringRepo.find({
  where: {
    doctorId: doctorId,
    dayOfWeek: dayOfWeek as any,
  },
});

  return {
    date,
    source: 'RECURRING',
    slots: recurring,
  };
}


}