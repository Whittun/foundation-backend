import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitEntity } from './entities/habit.entity';
import { HabitLevelEntity } from './entities/habit-level.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [HabitsService],
  controllers: [HabitsController],
  imports: [TypeOrmModule.forFeature([HabitEntity, HabitLevelEntity]), AuthModule],
})
export class HabitsModule {}
