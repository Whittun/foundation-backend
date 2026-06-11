import { Module } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { ObjectivesController } from './objectives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectiveEdgeEntity } from './entities/objective-edge.entity';
import { ObjectiveNodeEntity } from './entities/objective-node.entity';
import { ObjectiveGraphEntity } from './entities/objective-graph.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ObjectivesService],
  controllers: [ObjectivesController],
  imports: [
    TypeOrmModule.forFeature([ObjectiveEdgeEntity, ObjectiveNodeEntity, ObjectiveGraphEntity]),
    AuthModule,
  ],
})
export class ObjectivesModule {}
