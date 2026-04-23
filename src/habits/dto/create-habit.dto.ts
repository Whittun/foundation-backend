import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name!: string;
}
