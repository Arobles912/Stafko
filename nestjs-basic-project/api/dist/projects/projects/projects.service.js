"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const projects_entity_1 = require("../entity/projects.entity/projects.entity");
const projects_dto_1 = require("../dto/projects.dto/projects.dto");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async create(projectDto, file) {
        const project = this.projectsRepository.create({
            ...projectDto,
            project_file: file.buffer,
        });
        return this.projectsRepository.save(project);
    }
    async findAll() {
        return this.projectsRepository.find();
    }
    async findOne(id) {
        return this.projectsRepository.findOne({ where: { project_id: id } });
    }
    async update(id, projectDto) {
        await this.projectsRepository.update(id, projectDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.projectsRepository.delete(id);
    }
};
exports.ProjectsService = ProjectsService;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new project' }),
    (0, swagger_1.ApiBody)({ type: projects_dto_1.ProjectsDto, description: 'Body of the project with all the data fields' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The created project' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.ProjectsDto, typeof (_a = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets all the projects in the database' }),
    (0, swagger_1.ApiOkResponse)({ description: 'An array with all the projects', type: [projects_entity_1.ProjectsEntity] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets a project specified by the ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The project specified by the ID', type: projects_entity_1.ProjectsEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Project not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Updates a project specified by the ID' }),
    (0, swagger_1.ApiBody)({ type: projects_dto_1.ProjectsDto, description: 'The fields to update of the specified project' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The updated project', type: projects_entity_1.ProjectsEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Project not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, projects_dto_1.ProjectsDto]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Deletes the project specified by the ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Project successfully deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Project not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsService.prototype, "remove", null);
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)('Projects'),
    __param(0, (0, typeorm_1.InjectRepository)(projects_entity_1.ProjectsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map