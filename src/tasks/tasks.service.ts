import { Injectable,NotFoundException } from '@nestjs/common';
import { TasksRepository} from './tasks.repository';
import {Task} from './task.entity';
import { User } from 'src/auth/user.entity';
import {TaskStatus} from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'



@Injectable()
export class TasksService {

    constructor(private repository: TasksRepository) {}
    
    public async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.repository.getTaskById(id,user);
    
        if (!found) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    
        return found;
    }

    public async getTasks(filterDto:GetTasksFilterDto, user: User) : Promise<Task[]> {
      return await this.repository.getTasks(filterDto,user);
    }

    public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
      return await this.repository.createTask(createTaskDto,user);
    }

    public async deleteTask(id:string, user: User):Promise<void> {
        const deleteCount = await this.repository.deleteTask(id,user);

        if (deleteCount === 0){
            throw new NotFoundException(`Task with id ${id} not found`); 
        }

    }

    public async updateTaskStatus(id:string,status:TaskStatus,user: User):Promise<Task> {
        const task = await this.getTaskById(id,user);
        task.status = status;
        this.repository.getRepository().save(task);
        return task;
    }

}
