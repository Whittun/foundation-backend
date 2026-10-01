import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ObjectiveEdgeEntity } from './entities/objective-edge.entity';
import { ObjectiveGraphEntity } from './entities/objective-graph.entity';
import { ObjectiveNodeEntity } from './entities/objective-node.entity';
import { ObjectivesController } from './objectives.controller';
import { ObjectivesService } from './objectives.service';

@Module({
  providers: [ObjectivesService],
  controllers: [ObjectivesController],
  imports: [
    TypeOrmModule.forFeature([ObjectiveEdgeEntity, ObjectiveNodeEntity, ObjectiveGraphEntity]),
    AuthModule,
  ],
})
export class ObjectivesModule {}
