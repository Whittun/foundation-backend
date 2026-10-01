import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ScheduleDto } from './schedule.dto';

export class CreateTaskDto {
  @IsString()
  @Length(1, 400)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsDateString()
  startDate!: string;

  @ValidateNested()
  @IsDefined()
  @Type(() => ScheduleDto)
  schedule!: ScheduleDto;
}
