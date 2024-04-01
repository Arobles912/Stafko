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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("staff/:staffId"),
    __param(0, (0, common_1.Param)("staffId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findByStaffId", null);
__decorate([
    (0, common_1.Get)("project/:projectId"),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findByProjectId", null);
__decorate([
    (0, common_1.Get)("project/:projectId/users"),
    __param(0, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findUsersByProjectId", null);
__decorate([
    (0, common_1.Get)(":staffId/:projectId"),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(":staffId/:projectId"),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, staff_project_dto_1.StaffProjectDto]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":staffId/:projectId"),
    __param(0, (0, common_1.Param)("staffId")),
    __param(1, (0, common_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StaffProjectController.prototype, "remove", null);
exports.StaffProjectController = StaffProjectController = __decorate([
    (0, common_1.Controller)("api/staffProject"),
    __metadata("design:paramtypes", [staff_project_service_1.StaffProjectService])
], StaffProjectController);
//# sourceMappingURL=staff_project.controller.js.map