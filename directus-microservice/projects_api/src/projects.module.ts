import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './domain/entities/projects.entity';
import { ProjectsController } from './infrastructure/projects.controller';
import { ProjectsService } from './application/projects.service';
import { ProjectsRepository } from './domain/repositories/projects.respository';
import { DirectusService } from 'src/shared/directus/directus.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity])],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: 'ProjectsRepository',
      useClass: ProjectsRepository,
    },
    DirectusService
  ],
})
export class ProjectsModule {}
