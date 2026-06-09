import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../users/user.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'schedula_db',

  entities: [
    User,
    Doctor,
    Patient,
  ],

  migrations: [
    'src/migrations/*.ts',
  ],

  synchronize: false,
});
