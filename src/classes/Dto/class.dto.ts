import { IsEmail, IsNumber, IsString } from 'class-validator';

export class classDto {
  @IsString()
  className: string;

  @IsNumber()
  classCode: number;
  @IsNumber()
  courseId: number;

  @IsNumber()
  studentId: number;

  @IsString()
  students: any;

  @IsString()
  courses: any;
}
