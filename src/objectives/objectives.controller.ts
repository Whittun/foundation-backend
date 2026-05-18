import { Body, Controller, Get, Put } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { SaveObjectivesGraphDto } from './dto/save-objective-graph.dto';

@Controller('objectives')
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Get('graph')
  getObjectivesGraph() {
    return this.objectivesService.getGraph();
  }

  @Put('graph')
  saveObjectivesGraph(@Body() body: SaveObjectivesGraphDto) {
    return this.objectivesService.saveGraph(body);
  }
}
