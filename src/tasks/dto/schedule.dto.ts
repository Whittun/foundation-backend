import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ScheduleType } from '../task.entity';

export class ScheduleDto {
  @IsEnum(ScheduleType)
  type!: ScheduleType;

  @IsInt()
  every!: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  days?: number[];
}
