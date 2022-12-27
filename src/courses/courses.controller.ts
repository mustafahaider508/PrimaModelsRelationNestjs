import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Response } from 'express';
import { courseDto } from './dto/course.dto';
import { StudentDto } from 'src/student/Dto/student.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('')
  async getAllCourse(@Res() res: Response) {
    return this.coursesService.getAllCourse(res);
  }

  @Get('get-all-courses-by-classes')
  async getAllCourseByClass(@Res() res: Response) {
    return this.coursesService.getAllCourseByClass(res);
  }

  @Post('/addcourse')
  async addCourse(@Req() req, @Res() res: Response) {
    return this.coursesService.addCourse(req.body, res);
  }

  @Post('/add-student-course')
  async addStudentToCourse(@Req() req, @Res() res: Response) {
    console.log(req.body);
    return await this.coursesService.addStudentToCourse(req.body, res);
  }
}
