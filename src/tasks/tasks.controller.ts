import { Controller,Get,Post,Body } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task} from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private service : TasksService)
    {
    }

    @Get()
    public getAllTasks() : Task[]
    {
        return this.service.getAllTasks();
    }

    @Post()
    public createTask(
        @Body('title') title:string,
        @Body('description') description:string) : Task
    {
        return this.service.createTask(title, description);
    }
}
