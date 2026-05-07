import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateHabitDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;
}
