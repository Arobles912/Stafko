import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './domain/entities/projects.entity/projects.entity';
import { ProjectsController } from './commons/projects/projects.controller';
import { ProjectsService } from './commons/projects/projects.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
