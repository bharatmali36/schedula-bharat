import { IsEnum, IsString, Matches } from 'class-validator';
import { DayOfWeek } from '../enums/day-of-week.enum';

export class CreateRecurringAvailabilityDto {
  @IsEnum(DayOfWeek)
  dayOfWeek!: DayOfWeek;

  // format: "10:00"
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime!: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime!: string;
}