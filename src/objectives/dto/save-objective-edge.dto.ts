import { IsUUID } from 'class-validator';

export class SaveObjectiveEdgeDto {
  @IsUUID()
  id!: string;

  @IsUUID()
  source!: string;

  @IsUUID()
  target!: string;
}
