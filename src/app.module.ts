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
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        UserEntity,
      ],
      synchronize: true,
    }),
    DayRatingModule,
    HabitsModule,
    ObjectivesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
