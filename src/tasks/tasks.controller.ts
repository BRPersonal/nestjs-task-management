import { Controller,Get,Post,Delete,Body,Param } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task} from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';

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

    @Get('/:id')
    public getTaskById(@Param('id') id:string):Task {
        return this.service.getTaskById(id);

    }

    @Post()
    public createTask(
        @Body() createTaskDto : CreateTaskDto) : Task
    {
        return this.service.createTask(createTaskDto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id:string) {
        this.service.deleteTask(id);

    }
}
