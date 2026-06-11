import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { UpdateHabitLevelDto } from './dto/update-habit-level.dto';
import { CreateHabitLevelDto } from './dto/create-habit-level.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

type AuthenticatedRequest = Request & {
  user: {
    id: number;
  };
};

@UseGuards(AuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  getHabits(@Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.habitsService.findAllHabits(userId);
  }

  @Patch(':habitId')
  updateHabitName(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Req() request: AuthenticatedRequest,
    @Body() body: UpdateHabitDto,
  ) {
    const { name } = body;

    const userId = request.user.id;

    return this.habitsService.updateHabitName(userId, habitId, name);
  }

  @Post()
  createHabit(@Body() body: CreateHabitDto, @Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.habitsService.createHabit(body, userId);
  }

  @Delete(':habitId')
  deleteHabit(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    return this.habitsService.deleteHabit(habitId, userId);
  }

  @Get(':habitId/levels')
  getHabitLevelsByHabit(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    return this.habitsService.findHabitLevelsByHabit(habitId, userId);
  }

  @Patch('levels/:habitLevelId')
  updateHabitLevel(
    @Param('habitLevelId', ParseIntPipe) habitLevelId: number,
    @Body() body: UpdateHabitLevelDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    return this.habitsService.updateHabitLevel(habitLevelId, userId, body);
  }

  @Post(':habitId/levels')
  createHabitLevel(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Body() body: CreateHabitLevelDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    return this.habitsService.createHabitLevel(habitId, userId, body);
  }

  @Delete('levels/:habitLevelId')
  deleteHabitLevel(
    @Param('habitLevelId', ParseIntPipe) habitLevelId: number,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.id;

    return this.habitsService.deleteHabitLevel(habitLevelId, userId);
  }
}
