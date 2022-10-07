import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.entity';
import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task: Task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTask(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    return found;
  }

  async createTask({ title, description }: CreateTaskDto): Promise<Task> {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks[taskIndex].status = status;
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): void {
    const found = this.getTask(id);

    const taskIndex = this.tasks.findIndex((task) => task.id === found.id);
    this.tasks.splice(taskIndex, 1);
  }
}
