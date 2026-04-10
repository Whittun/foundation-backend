import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HabitEntity } from './entities/habit.entity';
import { Repository } from 'typeorm';
import { HabitLevelEntity } from './entities/habit-level.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(HabitEntity)
    private readonly habitRepository: Repository<HabitEntity>,

    @InjectRepository(HabitLevelEntity)
    private readonly habitLevelRepo: Repository<HabitLevelEntity>
  ){}

  async findAllHabits() {
    const allHabits = await this.habitRepository.find();
  
    return allHabits;
  }

  async createHabit() {
    
  }

  async updateHabitName(habitId: number, name: string) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
      }
    })

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
      return {deleted: false};
    };

    await this.habitRepository.delete(habit.id);
    return {deleted: true};
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
