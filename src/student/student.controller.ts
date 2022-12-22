import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import { Response } from 'express';
import { StudentDto } from './Dto/student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/getStudents')
  async getStudents(@Body() dto: StudentDto, @Res() res: Response) {
    return this.studentService.getStudents(dto, res);
  }

  @Post('/add')
  async addStudent(@Body() dto: StudentDto, @Res() res: Response) {
    return await this.studentService.addStudent(dto, res);
  }

  @Post('/studentClasses')
  async studentClasses(@Body() dto: StudentDto, @Res() res: Response) {
    return await this.studentService.studentClasses(dto, res);
  }
}
