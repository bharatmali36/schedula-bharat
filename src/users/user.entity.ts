import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';

import { UserRole } from './enums/user-role.enum';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role!: UserRole;

  @OneToOne(
    () => Doctor,
    (doctor) => doctor.user,
  )
  doctorProfile!: Doctor;

  @OneToOne(
    () => Patient,
    (patient) => patient.user,
  )
  patientProfile!: Patient;
}