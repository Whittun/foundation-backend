import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { SaveObjectivesGraphDto } from './dto/save-objective-graph.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';

@UseGuards(AuthGuard)
@Controller('objectives')
export class ObjectivesController {
  constructor(private readonly objectivesService: ObjectivesService) {}

  @Get('graph')
  getObjectivesGraph(@Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.objectivesService.getGraph(userId);
  }

  @Put('graph')
  saveObjectivesGraph(@Body() body: SaveObjectivesGraphDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.objectivesService.saveGraph(body, userId);
  }
}
