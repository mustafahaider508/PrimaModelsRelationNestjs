import { IsEmail, IsNumber, IsString } from 'class-validator';

export class courseDto {
  @IsString()
  courseName: string;
}
