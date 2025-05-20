import { Controller,Get,Post,Delete,Patch,Body,Param,Query,UseGuards } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { TasksService} from './tasks.service';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {UpdateTaskStatusDto} from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private service : TasksService)
    {
    }

    @Get('/:id')
    public async getTaskById(@Param('id') id: string): Promise<Task> {
      return await this.service.getTaskById(id);
    }

    @Get()
    public async getTasks(@Query() filterDto : GetTasksFilterDto) : Promise<Task[]> {

        return await this.service.getTasks(filterDto);
    }

    @Post()
    public async createTask(
        @Body() createTaskDto : CreateTaskDto) : Promise<Task>
    {
        return await this.service.createTask(createTaskDto);
    }

    @Delete('/:id')
    public async deleteTask(@Param('id') id:string):Promise<void> {
        await this.service.deleteTask(id);

    }

    @Patch('/:id/status')
    public async updateTaskStatus(
        @Param('id') id:string,
        @Body() statusDto:UpdateTaskStatusDto) : Promise<Task> {
            const {status} = statusDto;
            return await this.service.updateTaskStatus(id,status);

    }
}
