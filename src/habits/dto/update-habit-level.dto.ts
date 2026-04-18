import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateHabitLevelDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  level?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  target?: number;
}
