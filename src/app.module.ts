import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayRatingModule } from './day-rating/day-rating.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayRating } from './day-rating/day-rating.entity';
import { HabitsModule } from './habits/habits.module';
import { HabitEntity } from './habits/entities/habit.entity';
import { HabitLevelEntity } from './habits/entities/habit-level.entity';
import { ObjectivesModule } from './objectives/objectives.module';
import { ObjectiveGraphEntity } from './objectives/entities/objective-graph.entity';
import { ObjectiveNodeEntity } from './objectives/entities/objective-node.entity';
import { ObjectiveEdgeEntity } from './objectives/entities/objective-edge.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'foundation',
      entities: [
        DayRating,
        HabitEntity,
        HabitLevelEntity,
        ObjectiveGraphEntity,
        ObjectiveNodeEntity,
        ObjectiveEdgeEntity,
      ],
      synchronize: true,
    }),
    DayRatingModule,
    HabitsModule,
    ObjectivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
