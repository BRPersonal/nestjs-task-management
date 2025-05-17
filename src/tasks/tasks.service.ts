import { Injectable,NotFoundException } from '@nestjs/common';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];  //we will remove it later

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
      ) {}
    

    public getAllTasks() :Task[] {
            return this.tasks;
        }

    public async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({id: id});
    
        if (!found) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    
        return found;
    }

    public getFilteredTasks(filter:GetTasksFilterDto):Task[] {

        const {status,search} = filter;
        let result = this.tasks;

        //if status filter is present
        if(status) {
            result = result.filter((t) => t.status === status);
        }

        //if search is present
        if(search) {
            result = result.filter((t) => {
                if (t.title.includes(search) || t.description.includes(search))
                {
                    return true;
                }
                else
                {
                    return false;
                }

            });
        }

        return result;

    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
    
        const task = this.tasksRepository.create({
          title,
          description,
          status: TaskStatus.OPEN,
        });
    
        await this.tasksRepository.save(task);
        return task;
    }

    

    public deleteTask(id:string):void {
        const lengthBefore = this.tasks.length;

        this.removeObjectWithId(this.tasks,id);

        const lengthAfter = this.tasks.length;

        if (lengthBefore === lengthAfter){
            throw new NotFoundException(`Task with id ${id} not found`); 
        }

    }

    // public updateTaskStatus(id:string,status:TaskStatus):Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    private removeObjectWithId(arr:Task[], id:String) {
        const index = arr.findIndex((t) => t.id === id);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }    
}
