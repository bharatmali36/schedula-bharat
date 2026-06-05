import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enum';

export class SignupDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}