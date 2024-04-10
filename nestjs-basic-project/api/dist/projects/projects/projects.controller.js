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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const projects_dto_1 = require("../dto/projects.dto/projects.dto");
const projects_entity_1 = require("../entity/projects.entity/projects.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async create(projectDto, file) {
        return this.projectsService.create(projectDto, file);
    }
    async findAll() {
        return this.projectsService.findAll();
    }
    async findOne(id) {
        return this.projectsService.findOne(+id);
    }
    async update(id, projectDto) {
        return this.projectsService.update(+id, projectDto);
    }
    async findByProjectName(project_name) {
        return this.projectsService.findByProjectName(project_name);
    }
    async remove(id) {
        return this.projectsService.remove(+id);
    }
    async downloadFile(id, res) {
        const project = await this.projectsService.findOne(+id);
        res.send(project.project_file);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new project.' }),
    (0, swagger_1.ApiBody)({ type: projects_dto_1.ProjectsDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("project_file")),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the created project.', type: projects_entity_1.ProjectsEntity }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error has occurred while trying to create the project.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projects_dto_1.ProjectsDto, typeof (_a = typeof multer_1.MulterFile !== "undefined" && multer_1.MulterFile) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns an array with all the projects.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Project ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the project specified by the ID.', type: projects_entity_1.ProjectsEntity }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found.' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, swagger_1.ApiOperation)({ summary: 'Update project by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Project ID.' }),
    (0, swagger_1.ApiBody)({ type: projects_dto_1.ProjectsDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the updated project specified by the ID.', type: projects_entity_1.ProjectsEntity }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error has occurred while trying to update the project.' }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, projects_dto_1.ProjectsDto]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("projectname/:project_name"),
    __param(0, (0, common_1.Param)("project_name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "findByProjectName", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: 'Delete project by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Project ID.' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deletes the project specified by the ID.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error has occurred while trying to delete the project.' }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(":id/download"),
    (0, swagger_1.ApiOperation)({ summary: 'Download project file by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Project ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the project file.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error has occurred while trying to download the project file.' }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "downloadFile", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)("api/projects"),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map