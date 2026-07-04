import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHabitLevelDto } from './dto/create-habit-level.dto';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitLevelDto } from './dto/update-habit-level.dto';
import { HabitLevelEntity } from './entities/habit-level.entity';
import { HabitEntity } from './entities/habit.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitRepository: Repository<HabitEntity>,

    @InjectRepository(HabitLevelEntity)
    private readonly habitLevelRepo: Repository<HabitLevelEntity>,
  ) {}

  async findAllHabits(userId: number) {
    const allHabits = await this.habitRepository.find({
      where: {
        userId,
      },
    });

    return allHabits;
  }

  async updateHabitName(userId: number, habitId: number, name: string) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('habit does not exist');
    }

    habit.name = name;
    return this.habitRepository.save(habit);
  }

  async createHabit(createHabitArgs: CreateHabitDto, userId: number) {
    const { name } = createHabitArgs;

    const newHabit = this.habitRepository.create({
      name,
      userId,
    });

    return this.habitRepository.save(newHabit);
  }

  async createHabitLevel(habitId: number, userId: number, createDto: CreateHabitLevelDto) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) throw new NotFoundException('Habit not found');

    const existingHabitLevel = await this.habitLevelRepo.findOne({
      where: {
        habit: {
          id: habitId,
        },
        level: createDto.level,
      },
    });

    if (existingHabitLevel) {
      throw new ConflictException('Level already exists for this habit');
    }

    const newHabitLevel = this.habitLevelRepo.create({ ...createDto, habit: habit });

    return this.habitLevelRepo.save(newHabitLevel);
  }

  async updateHabitLevel(habitLevelId: number, userId: number, updateDto: UpdateHabitLevelDto) {
    const habitLevel = await this.habitLevelRepo.findOne({
      where: {
        id: habitLevelId,
        habit: { userId: userId },
      },
      relations: {
        habit: true,
      },
    });

    if (!habitLevel) throw new NotFoundException('HabitLevel not found');

    if (updateDto.level !== undefined) {
      const existingHabitLevel = await this.habitLevelRepo.findOne({
        where: {
          habit: {
            id: habitLevel.habit.id,
          },
          level: updateDto.level,
        },
      });

      if (existingHabitLevel && existingHabitLevel.id !== habitLevelId) {
        throw new ConflictException('Level already exists for this habit');
      }
    }

    const updatedHabitLevel = { ...habitLevel, ...updateDto };

    return this.habitLevelRepo.save(updatedHabitLevel);
  }

  async deleteHabitLevel(habitLevelId: number, userId: number) {
    const habitLevel = await this.habitLevelRepo.findOne({
      where: {
        id: habitLevelId,
        habit: { userId },
      },
    });

    if (!habitLevel) throw new NotFoundException('HabitLevel not found');

    await this.habitLevelRepo.delete(habitLevelId);
    return { deleted: true };
  }

  async deleteHabit(habitId: number, userId: number) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      return { deleted: false };
    }

    await this.habitRepository.delete(habit.id);
    return { deleted: true };
  }

  async findHabitLevelsByHabit(habitId: number, userId: number) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        userId,
      },
    });

    if (!habit) {
      throw new NotFoundException('Habit not found');
    }

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
