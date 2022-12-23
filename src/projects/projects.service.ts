import { HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { SampleDto } from './project.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}
  async getUploadFiles(req: any, res: any) {
    const uploadedFiles = await this.prisma.projects.findMany();
    await res.status(HttpStatus.OK).json(uploadedFiles);
  }

  async uploadFiles(req: any, res: any, file: any) {
    console.log(file);
    // try {
    const uploadFilesSave = await this.prisma.projects.create({
      data: {
        projectFile: file.path,
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
