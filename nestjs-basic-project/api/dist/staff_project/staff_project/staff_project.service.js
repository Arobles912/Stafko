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
exports.StaffProjectService = StaffProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_project_entity_1.StaffProjectEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffProjectService);
//# sourceMappingURL=staff_project.service.js.map