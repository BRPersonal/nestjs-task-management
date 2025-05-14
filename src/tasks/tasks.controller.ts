import { Controller,Get,Post,Delete,Patch,Body,Param,Query } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task,TaskStatus} from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'

@Controller('/tasks')
export class TasksController {
    constructor(private service : TasksService)
    {
    }

    @Get('/:id')
    public getTaskById(@Param('id') id:string):Task {
        return this.service.getTaskById(id);

    }

    @Get()
    public getTasks(@Query() filter : GetTasksFilterDto) : Task[] {

        if (Object.keys(filter).length > 0) {
            return this.service.getFilteredTasks(filter);
        }
        else
        {
            return this.service.getAllTasks();

        }
        
    }

    @Post()
    public createTask(
        @Body() createTaskDto : CreateTaskDto) : Task
    {
        return this.service.createTask(createTaskDto);
    }

    @Delete('/:id')
    public deleteTask(@Param('id') id:string):void {
        this.service.deleteTask(id);

    }

    @Patch('/:id/status')
    public updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TaskStatus):Task {
            return this.service.updateTaskStatus(id,status);

    }
}
