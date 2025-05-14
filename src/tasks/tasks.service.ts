import { Injectable } from '@nestjs/common';
import {Task,TaskStatus} from './task.model';
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    public getAllTasks() :Task[] {
        console.log('getAllTasks called');
        return this.tasks;
    }

    public getTaskById(id:string) :  Task {
        return this.tasks.find((task) => task.id === id);
    }

    public getFilteredTasks(filter:GetTasksFilterDto):Task[] {

        console.log('getFilteredTasks called');
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

    public createTask(createTaskDto : CreateTaskDto): Task {

        //unpack dto
        const {title, description} = createTaskDto;

        const task:Task = {
            id:uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;

    }

    public deleteTask(id:string):void {
        this.removeObjectWithId(this.tasks,id);
    }

    public updateTaskStatus(id:string,status:TaskStatus):Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    private removeObjectWithId(arr:Task[], id:String) {
        const index = arr.findIndex((t) => t.id === id);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }    
}
