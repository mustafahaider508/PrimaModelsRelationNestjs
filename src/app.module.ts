import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { ClassesModule } from './classes/classes.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [StudentModule, CoursesModule, ClassesModule, PrismaModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
