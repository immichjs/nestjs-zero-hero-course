import { Task } from './task.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private tasksRepository: Repository<Task>
  ) { }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Tarefa de ID (${id}) não foi encontrada.`);
    }

    return found;
  }
}
