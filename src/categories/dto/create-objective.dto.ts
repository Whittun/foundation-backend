import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateObjectiveDto {
  categoryId: number;

  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty({ type: [Boolean] })
  days: boolean[];
}
