import { Module } from '@nestjs/common';
import { TaskManager } from './task.command';


@Module({
  providers: [TaskManager],
})
export class CliModule {}