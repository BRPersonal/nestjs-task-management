import {TaskStatus} from '../task.model';

export class GetTasksFilterDto {
    status?:TaskStatus;  //optional field
    search?:string;     //optional field
}