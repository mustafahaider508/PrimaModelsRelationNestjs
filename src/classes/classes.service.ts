import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Response } from 'express';
import { classDto } from './Dto/class.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async addClasses(@Res() res: Response, dto: classDto) {
    const { className, classCode, courseId } = dto;
    try {
      const addclass = await this.prisma.classes.create({
        data: {
          className: className,
          classCode: classCode,
          courseId,
        },
      });
      return res.status(HttpStatus.OK).json(addclass);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: err,
      });
    }
  }
}
