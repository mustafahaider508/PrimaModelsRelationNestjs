import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    StudentModule,
    CoursesModule,
    ClassesModule,
    PrismaModule,
    ProjectsModule,
    GatewayModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'),
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
