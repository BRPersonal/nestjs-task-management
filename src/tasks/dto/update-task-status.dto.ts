import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

//The only reason we have a dto for single field
//is that isEnum decorator can only be applied on a dto
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
