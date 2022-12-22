import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { courseDto } from './dto/course.dto';
import { Response } from 'express';
import { StudentDto } from 'src/student/Dto/student.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getAllCourse(@Res() res: Response) {
    try {
      const allcourses = await this.prisma.course.findMany();
      return res.status(HttpStatus.OK).json(allcourses);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }

  async getAllCourseByClass(@Res() res: Response) {
    try {
      const allCourseClasses = await this.prisma.course.findMany({
        include: {
          classes: true,
        },
      });
      return res.status(HttpStatus.OK).json(allCourseClasses);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }

  async addCourse(dto: courseDto, @Res() res: Response) {
    const { courseName } = dto;
    try {
      const addStudent = await this.prisma.course.create({
        data: {
          courseName: courseName,
        },
      });
      return res.status(HttpStatus.OK).json(addStudent);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }

  async addStudentToCourse(details: any, @Res() res: Response) {
    try {
      const addStudentToCourse = await this.prisma.course.update({
        where: {
          id: details.courseId,
        },
        data: {
          students: {
            connect: {
              id: details.studentId,
            },
          },
        },
      });
      return res.status(HttpStatus.OK).json(addStudentToCourse);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }
}
