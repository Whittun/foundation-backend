import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DayRating } from './day-rating/day-rating.entity';
import { DayRatingModule } from './day-rating/day-rating.module';
import { HabitLevelEntity } from './habits/entities/habit-level.entity';
import { HabitEntity } from './habits/entities/habit.entity';
import { HabitsModule } from './habits/habits.module';
import { ObjectiveEdgeEntity } from './objectives/entities/objective-edge.entity';
import { ObjectiveGraphEntity } from './objectives/entities/objective-graph.entity';
import { ObjectiveNodeEntity } from './objectives/entities/objective-node.entity';
import { ObjectivesModule } from './objectives/objectives.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: Number(configService.getOrThrow<string>('DB_PORT')),
        username: configService.getOrThrow<string>('DB_USER'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [
          DayRating,
          HabitEntity,
          HabitLevelEntity,
          ObjectiveGraphEntity,
          ObjectiveNodeEntity,
          ObjectiveEdgeEntity,
          UserEntity,
        ],
        synchronize: configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
      }),
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
