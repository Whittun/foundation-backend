import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID, ValidateNested } from 'class-validator';

export class SaveObjectiveNodePositionDto {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;
}

export class SaveObjectiveNodeDataDto {
  @IsString()
  @IsNotEmpty()
  label!: string;

  @IsBoolean()
  completed!: boolean;
}

export class SaveObjectiveNodeDto {
  @IsUUID()
  id!: string;

  @IsString()
  type!: string;

  @ValidateNested()
  @Type(() => SaveObjectiveNodeDataDto)
  data!: SaveObjectiveNodeDataDto;

  @ValidateNested()
  @Type(() => SaveObjectiveNodePositionDto)
  position!: SaveObjectiveNodePositionDto;
}
