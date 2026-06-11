import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { DayOfWeek } from '../enums/day-of-week.enum';
import { Doctor } from '../../doctor/doctor.entity';
import { JoinColumn } from 'typeorm';

@Entity('recurring_availability')
@Index(['doctorId', 'dayOfWeek'])
export class RecurringAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  doctorId!: number;

@ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'doctorId' })
doctor!: Doctor;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek!: DayOfWeek;

  @Column()
  startTime!: string; // "10:00"

  @Column()
  endTime!: string; // "13:00"
}