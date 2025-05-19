import { Injectable,NotFoundException } from '@nestjs/common';
import {Task} from './task.entity';
import {TaskStatus} from './task-status.enum';
import {CreateTaskDto} from './dto/create-task.dto';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
      ) {}
    

    public async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOneBy({id: id});
    
        if (!found) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
    
        return found;
    }

    public async getTasks(filterDto:GetTasksFilterDto) : Promise<Task[]> {
        const { status, search } = filterDto;
        const qb = this.tasksRepository.createQueryBuilder('task');
        
        if (status) {
            qb.andWhere('task.status = :filter_status', 
                { filter_status: status });
          }
      
          if (search) {
            qb.andWhere(
              'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
              { search: `%${search}%` },
            );
          }
      
          const tasks = await qb.getMany();
          return tasks;

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

    public async deleteTask(id:string):Promise<void> {
        const result = await this.tasksRepository.delete({id: id});

        if (result.affected === 0){
            throw new NotFoundException(`Task with id ${id} not found`); 
        }

    }

    public async updateTaskStatus(id:string,status:TaskStatus):Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        this.tasksRepository.save(task);
        return task;
    }

}
