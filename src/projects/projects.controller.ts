import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ProjectsService } from './projects.service';
import { SampleDto } from './project.dto';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getUploadFiles(@Req() req: Request, @Res() res: Response) {
    return this.projectsService.getUploadFiles(req, res);
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFile(
  //   @Body() body: SampleDto,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  // @Post('upload')
  // @UseInterceptors(
  //   FilesInterceptor('files', 20, {
  //     storage: diskStorage({
  //       destination: './uploads/',
  //     }),
  //   }),
  // )

  // var storage = multer.diskStorage({
  //   destination: "./uploads",
  //   filename: (req, file, cb) => {
  //     cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  //   }});

  @Post('file/pass-validation')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16));
          cb(null, file.fieldname + '-' + Date.now() + file.originalname);
        },
      }),
    }),
  )
  async uploadFileAndFailValidation(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return await this.projectsService.uploadFiles(req, res, file);
  }
}
