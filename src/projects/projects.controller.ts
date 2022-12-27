import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ProjectsService } from './projects.service';
import { SampleDto } from './project.dto';
import { Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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

  @Get('/get-files/:projectId')
  getFile(@Param() param, @Res({ passthrough: true }) res: Response) {
    return this.projectsService.getUploadFiles(param.projectId, res);
  }

  @Get('/get-all-files/:projectId')
  getAllFile(@Param() param, @Res({ passthrough: true }) res: Response) {
    return this.projectsService.getAllFiles(param.projectId, res);
  }
}
