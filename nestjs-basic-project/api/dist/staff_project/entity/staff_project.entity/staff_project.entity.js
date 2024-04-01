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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffProjectEntity = void 0;
const typeorm_1 = require("typeorm");
const staff_entity_1 = require("../../../staff/entity/staff.entity/staff.entity");
const projects_entity_1 = require("../../../projects/entity/projects.entity/projects.entity");
let StaffProjectEntity = class StaffProjectEntity {
};
exports.StaffProjectEntity = StaffProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StaffProjectEntity.prototype, "staff_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], StaffProjectEntity.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.StaffEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'staff_id' }),
    __metadata("design:type", staff_entity_1.StaffEntity)
], StaffProjectEntity.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => projects_entity_1.ProjectsEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'project_id' }),
    __metadata("design:type", projects_entity_1.ProjectsEntity)
], StaffProjectEntity.prototype, "project", void 0);
exports.StaffProjectEntity = StaffProjectEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'staff_project' })
], StaffProjectEntity);
//# sourceMappingURL=staff_project.entity.js.map