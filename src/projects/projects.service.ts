import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Injectable,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './project.dto';
import { PrismaService } from 'prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async getAllFiles(projectId: number, res: any) {
    const getAllFiles = await this.prisma.projects.findMany({
      where: {
        projectId: +projectId,
      },
    });
    return await res.status(HttpStatus.OK).json(getAllFiles);
  }

  async getUploadFiles(projectId: number, res: any) {
    const uploadedFiles = await this.prisma.projects.findMany({
      where: {
        projectId: +projectId,
      },
    });
    const filess = uploadedFiles.map((i: any) => i.projectFile);
    const file = createReadStream(join(process.cwd(), `${filess}`));
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="example.pdf"',
    });
    return new StreamableFile(file);
  }

  async uploadFiles(req: any, res: any, file: any) {
    console.log(file);
    // try {
    const uploadFilesSave = await this.prisma.projects.create({
      data: {
        projectFile: file.path,
        fileName: file.originalname,
      },
    });
    return await res.status(HttpStatus.OK).json(uploadFilesSave);
    // } catch (err) {
    //   res.status(HttpStatus.BAD_REQUEST).send({
    //     message: err,
    //   });
    // }
  }
}
