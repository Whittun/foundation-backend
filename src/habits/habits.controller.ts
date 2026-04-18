import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  getHabits() {
    return this.habitsService.findAllHabits();
  }

  @Patch()
  updateHabitName(@Body() body: { habitId: number; name: string }) {
    const { habitId, name } = body;

    return this.habitsService.updateHabitName(habitId, name);
  }

  @Post()
  createHabit(@Body() body: { name: string }) {
    const { name } = body;

    return this.habitsService.createHabit(name);
  }

  @Delete()
  deleteHabit(@Body() body: { habitId: number }) {
    const { habitId } = body;

    return this.habitsService.deleteHabit(habitId);
  }

  @Get(':habitId/levels')
  getHabitLevelsByHabit(@Param('habitId') habitId: number) {
    return this.habitsService.findHabitLevelsByHabit(habitId);
  }
}
