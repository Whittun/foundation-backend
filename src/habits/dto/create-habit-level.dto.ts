import { IsInt, IsString, Min } from "class-validator";


export class CreateHabitLevelDto {
  @IsInt()
  @Min(1)
  level!: number;

  @IsString()
  description!: string;

  @IsInt()
  @Min(1)
  target!: number;
};

