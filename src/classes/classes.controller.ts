import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { Response } from 'express';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('/add-class')
  async addClass(@Req() req, @Res() res: Response) {
    return await this.classesService.addClasses(res, req.body);
  }
}
