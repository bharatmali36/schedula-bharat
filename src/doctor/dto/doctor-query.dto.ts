import {
  IsOptional,
  IsString,
  IsNumberString,
  IsBooleanString,
} from 'class-validator';

export class DoctorQueryDto {
  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsBooleanString()
  availability?: string;
}