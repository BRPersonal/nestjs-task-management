import { Controller,Get,Post,Delete,Patch,Body,Param,Query,UseGuards } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task} from './task.entity';
import { User } from 'src/auth/user.entity';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {UpdateTaskStatusDto} from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private service : TasksService)
    {
    }

    @Get('/:id')
    public async getTaskById(@Param('id') id: string,@GetUser() user: User): Promise<Task> {
      return await this.service.getTaskById(id,user);
    }

    @Get()
    public async getTasks(@Query() filterDto : GetTasksFilterDto,
                        @GetUser() user: User ) : Promise<Task[]> {

        return await this.service.getTasks(filterDto,user);
    }

    @Post()
    public async createTask(
        @Body() createTaskDto : CreateTaskDto,@GetUser() user: User) : Promise<Task>
    {
        return await this.service.createTask(createTaskDto,user);
    }

    @Delete('/:id')
    public async deleteTask(@Param('id') id:string,@GetUser() user: User):Promise<void> {
        await this.service.deleteTask(id,user);

    }

    @Patch('/:id/status')
    public async updateTaskStatus(
        @Param('id') id:string,
        @Body() statusDto:UpdateTaskStatusDto,
        @GetUser() user: User) : Promise<Task> {
            const {status} = statusDto;
            return await this.service.updateTaskStatus(id,status,user);

    }
}
