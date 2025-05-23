import {Injectable} from '@nestjs/common';
import {DataSource,Repository } from 'typeorm';
import {Task} from './task.entity';
import { User } from 'src/auth/user.entity';
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto';
import {CreateTaskDto} from './dto/create-task.dto';
import {TaskStatus} from './task-status.enum';
import { InternalServerErrorException,Logger } from '@nestjs/common';

@Injectable()
export class TasksRepository {
    private logger = new Logger('TasksRepository', {timestamp: true});
    private taskRepository : Repository<Task>;

    constructor(private dataSource: DataSource) {
        this.taskRepository = this.dataSource.getRepository(Task);
    }

    public getRepository() : Repository<Task> {
        return this.taskRepository;
    }

    public async getTaskById(id: string,user:User): Promise<Task> {
        return await this.taskRepository.findOne({where: {id,user}});
    }

    public async getTasks(filterDto:GetTasksFilterDto,user:User) : Promise<Task[]> {
        const { status, search } = filterDto;
        const qb = this.taskRepository.createQueryBuilder('task');
        qb.where({ user });
        
        if (status) {
            qb.andWhere('task.status = :filter_status', 
                { filter_status: status });
        }
      
        if (search) {
            qb.andWhere(
              '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
              { search: `%${search}%` },
            );
        }
      
        try{
            const tasks = await qb.getMany();
            return tasks;        
        }
        catch(error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`,error.stack);
            throw new InternalServerErrorException();
        }
    }

    public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
    
        const task = this.taskRepository.create({
          title,
          description,
          status: TaskStatus.OPEN,
          user
        });
    
        await this.taskRepository.save(task);
        return task;

    }

    public async deleteTask(id:string, user: User):Promise<number> {
        const result = await this.taskRepository.delete({ id, user });
        return result.affected;
    }
}