import { Equals, IsArray, IsEnum, IsInt, Max, Min } from 'class-validator';
import { ScheduleType } from '../task.entity';

export class ScheduleDto {
  @IsEnum(ScheduleType)
  type!: ScheduleType;

  @IsInt()
  @Min(1)
  every!: number;

  @IsArray({
    validateIf: (dto) => dto.type === ScheduleType.WEEKLY,
  })
  @Equals(undefined, { validateIf: (dto) => dto.type !== ScheduleType.WEEKLY })
  @IsInt({
    each: true,
    validateIf: (dto) => dto.type === ScheduleType.WEEKLY,
  })
  @Min(0, { each: true, validateIf: (dto) => dto.type === ScheduleType.WEEKLY })
  @Max(6, { each: true, validateIf: (dto) => dto.type === ScheduleType.WEEKLY })
  days?: number[];
}
