import { IsEmail, IsString, IsNumber } from 'class-validator';

export class StudentDto {
  @IsNumber()
  id: number;
  @IsNumber()
  classId: number;
  @IsString()
  name: string;

  @IsEmail()
  public email: string;
}
