import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Doctor } from '../../doctor/doctor.entity';
import { JoinColumn } from 'typeorm';

@Entity('custom_availability')
@Index(['doctorId', 'date'])
export class CustomAvailability {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  doctorId!: number;

 @ManyToOne(() => Doctor, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'doctorId' })
doctor!: Doctor;

  @Column()
  date!: string; 

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;
}