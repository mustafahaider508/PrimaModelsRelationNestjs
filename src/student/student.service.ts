import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Response } from 'express';
import { StudentDto } from './Dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async addStudent(dto: StudentDto, @Res() res: Response) {
    const { name, email } = dto;
    try {
      const addStudent = await this.prisma.student.create({
        data: {
          name,
          email,
        },
      });
      return res.status(HttpStatus.OK).json(addStudent);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }

  async getStudents(dto: StudentDto, @Res() res: Response) {
    const getStudent = await this.prisma.student.findMany();
    return res.status(HttpStatus.OK).json(getStudent);
  }

  async studentClasses(dto: StudentDto, @Res() res: Response) {
    const getStudentClasses = await this.prisma.student.findMany({
      where: {
        id: dto.id,
      },
      include: {
        course: {
          include: {
            classes: true,
          },
        },
      },
    });

    const classes = getStudentClasses[0].course[0].classes.map((i: any) => {
      return { classId: i.classId };
    });

    console.log(classes);
    const studentClasses = await this.prisma.student.update({
      where: {
        id: dto.id,
      },
      data: {
        classes: {
          connect: classes,
        },
      },
    });

    return res.status(HttpStatus.OK).json(studentClasses);
  }
}
