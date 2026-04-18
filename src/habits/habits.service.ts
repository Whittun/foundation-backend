import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitEntity } from './entities/habit.entity';
import { Repository } from 'typeorm';
import { HabitLevelEntity } from './entities/habit-level.entity';
import { CreateHabitLevelDto } from './dto/create-habit-level.dto';
import { UpdateHabitLevelDto } from './dto/update-habit-level.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitRepository: Repository<HabitEntity>,

    @InjectRepository(HabitLevelEntity)
    private readonly habitLevelRepo: Repository<HabitLevelEntity>,
  ) {}

  async findAllHabits() {
    const allHabits = await this.habitRepository.find();

    return allHabits;
  }

  async createHabit(name: string) {
    const newHabit = this.habitRepository.create({
      name,
    });

    return this.habitRepository.save(newHabit);
  }

  async createHabitLevel(habitId: number, createDto: CreateHabitLevelDto) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
      },
    });

    if (!habit) throw new NotFoundException('Habit not found');

    const newHabitLevel = this.habitLevelRepo.create({ ...createDto, habit: habit });

    return this.habitLevelRepo.save(newHabitLevel);
  }

  async updateHabitLevel(habitLevelId: number, updateDto: UpdateHabitLevelDto) {
    const habitLevel = await this.habitLevelRepo.findOne({
      where: {
        id: habitLevelId,
      },
    });

    if (!habitLevel) throw new NotFoundException('HabitLevel not found');

    const updatedHabitLevel = { ...habitLevel, ...updateDto };

    return this.habitLevelRepo.save(updatedHabitLevel);
  }

  async deleteHabitLevel(habitLevelId: number) {
    const habitLevel = await this.habitLevelRepo.findOne({
      where: {
        id: habitLevelId,
      },
    });

    if (!habitLevel) throw new NotFoundException('HabitLevel not found');

    await this.habitLevelRepo.delete(habitLevelId);
    return { deleted: true };
  }

  async updateHabitName(habitId: number, name: string) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      throw new NotFoundException('habit does not exist');
    }

    habit.name = name;
    return this.habitRepository.save(habit);
  }

  async deleteHabit(habitId: number) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
      },
    });

    if (!habit) {
      return { deleted: false };
    }

    await this.habitRepository.delete(habit.id);
    return { deleted: true };
  }

  async findHabitLevelsByHabit(habitId: number) {
    const habitLevels = await this.habitLevelRepo.find({
      where: {
        habit: {
          id: habitId,
        },
      },
      order: {
        level: 'ASC',
      },
    });

    return habitLevels;
  }
}
