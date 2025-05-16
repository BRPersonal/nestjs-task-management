import { IsEnum, IsOptional, IsString } from 'class-validator';
import {TaskStatus} from '../task.model';

export class GetTasksFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;  //optional field

    @IsOptional()
    @IsString()
    search?:string;     //optional field
}