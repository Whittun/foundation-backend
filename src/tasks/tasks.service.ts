import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getAllTasks(userId: number) {
    return this.tasksRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async editTask(userId: number, taskId: number, taskDto: EditTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const updatedTask = { ...task, ...taskDto };

    await this.tasksRepository.save(updatedTask);

    return { updated: true };
  }

  async removeTask(userId: number, taskId: number) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.remove(task);

    return { deleted: true };
  }

  async createTask(userId: number, createTaskDto: CreateTaskDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newTask = this.tasksRepository.create({ user, ...createTaskDto });

    await this.tasksRepository.save(newTask);

    return { created: true };
  }
}
