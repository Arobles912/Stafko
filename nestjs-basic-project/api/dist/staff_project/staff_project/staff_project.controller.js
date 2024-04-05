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
exports.StaffProjectController = void 0;
const common_1 = require("@nestjs/common");
const staff_project_service_1 = require("./staff_project.service");
const staff_project_dto_1 = require("../dto/staff_project.dto/staff_project.dto");
const staff_project_entity_1 = require("../entity/staff_project.entity/staff_project.entity");
const swagger_1 = require("@nestjs/swagger");
let StaffProjectController = class StaffProjectController {
    constructor(staffProjectService) {
        this.staffProjectService = staffProjectService;
    }
    async create(staffProjectDto) {
        return this.staffProjectService.create(staffProjectDto);
    }
    async findByStaffId(staffId) {
        return this.staffProjectService.findByStaffId(staffId);
    }
    async findByProjectId(projectId) {
        return this.staffProjectService.findByProjectId(projectId);
    }
    async removeByProjectId(projectId) {
        return this.staffProjectService.removeByProjectId(+projectId);
    }
    async findUsersByProjectId(projectId) {
        try {
            const members = await this.staffProjectService.findByProjectId(projectId);
            const usernames = await Promise.all(members.map(async (member) => {
                const user = await this.staffProjectService.findUserById(member.staff_id);
                return user ? user.username : null;
            }));
            return usernames.filter((username) => username !== null);
        }
        catch (error) {
            console.error("Error fetching users by project ID:", error.message);
            throw new Error("Failed to fetch users");
        }
    }
    async findOne(staffId, projectId) {
        return this.staffProjectService.findOne(+staffId, +projectId);
    }
    async findAll() {
        return this.staffProjectService.findAll();
    }
    async update(staffId, projectId, staffProjectDto) {
        return this.staffProjectService.update(+staffId, +projectId, staffProjectDto);
    }
    async remove(staffId, projectId) {
        return this.staffProjectService.remove(+staffId, +projectId);
    }
};
exports.StaffProjectController = StaffProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a relationship between a staff member and a project' }),
    (0, swagger_1.ApiBody)({ type: staff_project_dto_1.StaffProjectDto, description: 'Staff project data' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The created staff project', type: staff_project_entity_1.StaffProjectEntity }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("staff/:staffId"),
    (0, swagger_1.ApiOperation)({ summary: 'Finds projects by staff ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'ID of the staff' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Projects associated with the staff' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("staffId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findByStaffId", null);
__decorate([
    (0, common_1.Get)("project/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: 'Finds staff projects by project ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff projects associated with the project' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findByProjectId", null);
__decorate([
    (0, common_1.Delete)("project/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: 'Removes staff projects by project ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Staff projects removed successfully' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "removeByProjectId", null);
__decorate([
    (0, common_1.Get)("project/:projectId/users"),
    (0, swagger_1.ApiOperation)({ summary: 'Finds users by project ID' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns usernames of users associated with the project' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findUsersByProjectId", null);
__decorate([
    (0, common_1.Get)(":staffId/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: 'Finds staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'ID of the staff member' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff project found', }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all staff projects' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All staff projects found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(":staffId/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: 'Updates staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'ID of the staff' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiBody)({ type: staff_project_dto_1.StaffProjectDto, description: 'Staff project data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Staff project updated', type: staff_project_entity_1.StaffProjectEntity }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":staffId/:projectId"),
    (0, swagger_1.ApiOperation)({ summary: 'Removes staff project by staff ID and project ID' }),
    (0, swagger_1.ApiParam)({ name: 'staffId', description: 'ID of the staff' }),
    (0, swagger_1.ApiParam)({ name: 'projectId', description: 'ID of the project' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Staff project removed successfully' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error' }),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "remove", null);
exports.StaffProjectController = StaffProjectController = __decorate([
    (0, swagger_1.ApiTags)('Staff Project'),
    (0, common_1.Controller)("api/staffProject"),
    __metadata("design:paramtypes", [staff_project_service_1.StaffProjectService])
], StaffProjectController);
//# sourceMappingURL=staff_project.controller.js.map