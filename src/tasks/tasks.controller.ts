import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { CreateTaskDto } from './dto/create-task.dto';
import { EditTaskDto } from './dto/edit-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(@Req() request: AuthenticatedRequest) {
    return this.tasksService.getAllTasks(request.user.id);
  }

  @Patch(':taskId')
  editTask(
    @Req() request: AuthenticatedRequest,
    @Param('taskId') taskId: number,
    @Body() taskDto: EditTaskDto,
  ) {
    return this.tasksService.editTask(request.user.id, taskId, taskDto);
  }

  @Post()
  createTask(@Req() request: AuthenticatedRequest, @Body() taskDto: CreateTaskDto) {
    return this.tasksService.createTask(request.user.id, taskDto);
  }

  @Delete(':taskId')
  removeTask(@Req() request: AuthenticatedRequest, @Param('taskId') taskId: number) {
    return this.tasksService.removeTask(request.user.id, taskId);
  }
}
