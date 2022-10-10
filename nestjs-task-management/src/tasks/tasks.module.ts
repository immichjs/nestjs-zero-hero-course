import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { taskProviders } from './task.providers';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...taskProviders],
})
export class TasksModule {}
