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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_project_entity_1 = require("../entity/staff_project.entity/staff_project.entity");
const staff_project_dto_1 = require("../dto/staff_project.dto/staff_project.dto");
const swagger_1 = require("@nestjs/swagger");
let StaffProjectService = class StaffProjectService {
    constructor(staffProjectRepository) {
        this.staffProjectRepository = staffProjectRepository;
    }
    async create(staffProjectDto) {
        const staffProject = this.staffProjectRepository.create(staffProjectDto);
        return this.staffProjectRepository.save(staffProject);
    }
    async findAll() {
        return this.staffProjectRepository.find();
    }
    async findOne(staffId, projectId) {
        return this.staffProjectRepository.findOne({ where: { staff_id: staffId, project_id: projectId } });
    }
    async findByStaffId(staffId) {
        return this.staffProjectRepository.find({ where: { staff_id: staffId } });
    }
    async findByProjectId(projectId) {
        return this.staffProjectRepository.find({ where: { project_id: projectId } });
    }
    async update(staffId, projectId, staffProjectDto) {
        await this.staffProjectRepository.update({ staff_id: staffId, project_id: projectId }, staffProjectDto);
        return this.findOne(staffId, projectId);
    }
    async remove(staffId, projectId) {
        await this.staffProjectRepository.delete({ staff_id: staffId, project_id: projectId });
    }
    async removeByProjectId(projectId) {
        await this.staffProjectRepository.delete({ project_id: projectId });
    }
    async findUserById(userId) {
        const user = await this.staffProjectRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
        return user[0] || null;
    }
};
exports.StaffProjectService = StaffProjectService;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creates a relationship between a staff member and a project' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The created staff project' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad request' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets all staff projects' }),
    (0, swagger_1.ApiOkResponse)({ description: 'An array with all the staff projects', type: [staff_project_entity_1.StaffProjectEntity] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets a staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'Staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The staff project specified by the staff ID and project ID', type: staff_project_entity_1.StaffProjectEntity }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets staff projects by staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'Staff ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'An array with all the staff projects of the specified staff ID', type: [staff_project_entity_1.StaffProjectEntity] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "findByStaffId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Gets staff projects by project ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'An array with all the staff projects of the specified project ID', type: [staff_project_entity_1.StaffProjectEntity] }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "findByProjectId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Updates a staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'Staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'The updated staff project' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Removes a staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'Staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Staff project successfully deleted' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Removes staff projects by project ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'Project ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Staff projects successfully deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'No staff projects found for the specified project ID' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "removeByProjectId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Finds a user from the staff table by staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectService.prototype, "findUserById", null);
exports.StaffProjectService = StaffProjectService = __decorate([
    (0, common_1.Injectable)(),
    (0, swagger_1.ApiTags)('StaffProject'),
    __param(0, (0, typeorm_1.InjectRepository)(staff_project_entity_1.StaffProjectEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffProjectService);
//# sourceMappingURL=staff_project.service.js.map