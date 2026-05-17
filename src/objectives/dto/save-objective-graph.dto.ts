import { Type } from 'class-transformer';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { SaveObjectiveEdgeDto } from './save-objective-edge.dto';
import { SaveObjectiveNodeDto } from './save-objective-node.dto';

export class SaveObjectivesGraphDto {
  @IsInt()
  @Min(1)
  version!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveObjectiveNodeDto)
  nodes!: SaveObjectiveNodeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaveObjectiveEdgeDto)
  edges!: SaveObjectiveEdgeDto[];
}
