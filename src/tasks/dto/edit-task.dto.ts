import { Type } from 'class-transformer';
import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ScheduleDto } from './schedule.dto';

export class EditTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 400)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleDto)
  schedule?: ScheduleDto;

  @IsOptional()
  @IsDateString()
  completedDate?: string | null;
}
