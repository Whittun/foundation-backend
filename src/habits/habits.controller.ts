import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { UpdateHabitLevelDto } from './dto/update-habit-level.dto';
import { CreateHabitLevelDto } from './dto/create-habit-level.dto';
import { CreateHabitDto } from './dto/create-habit.dto';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  getHabits() {
    return this.habitsService.findAllHabits();
  }

  @Patch(':habitId')
  updateHabitName(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Body()
    body: {
      name: string;
    },
  ) {
    const { name } = body;

    return this.habitsService.updateHabitName(habitId, name);
  }

  @Post()
  createHabit(@Body() body: CreateHabitDto) {
    return this.habitsService.createHabit(body);
  }

  @Delete(':habitId')
  deleteHabit(@Param('habitId', ParseIntPipe) habitId: number) {
    return this.habitsService.deleteHabit(habitId);
  }

  @Get(':habitId/levels')
  getHabitLevelsByHabit(@Param('habitId', ParseIntPipe) habitId: number) {
    return this.habitsService.findHabitLevelsByHabit(habitId);
  }

  @Patch('levels/:habitLevelId')
  updateHabitLevel(
    @Param('habitLevelId', ParseIntPipe) habitLevelId: number,
    @Body() body: UpdateHabitLevelDto,
  ) {
    return this.habitsService.updateHabitLevel(habitLevelId, body);
  }

  @Post(':habitId/levels')
  createHabitLevel(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Body() body: CreateHabitLevelDto,
  ) {
    return this.habitsService.createHabitLevel(habitId, body);
  }

  @Delete('levels/:habitLevelId')
  deleteHabitLevel(@Param('habitLevelId', ParseIntPipe) habitLevelId: number) {
    return this.habitsService.deleteHabitLevel(habitLevelId);
  }
}
