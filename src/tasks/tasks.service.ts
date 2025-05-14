import { Injectable } from '@nestjs/common';
import {Task,TaskStatus} from './task.model';
import {v4 as uuid} from 'uuid';
import {CreateTaskDto} from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    public getAllTasks() :Task[] {
        return this.tasks;
    }

    public getTaskById(id:string) :  Task {
        return this.tasks.find((task) => task.id === id);
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

    public deleteTask(id:string) {
        this.removeObjectWithId(this.tasks,id);
    }

    private removeObjectWithId(arr:Task[], id:String) {
        const index = arr.findIndex(obj => obj.id === id);
        if (index > -1) {
          arr.splice(index, 1);
        }
      }    
}
