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
exports.ProjectsEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let ProjectsEntity = class ProjectsEntity {
};
exports.ProjectsEntity = ProjectsEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique identifier of the project' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectsEntity.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the project', maxLength: 50 }),
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], ProjectsEntity.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The description of the project', maxLength: 3000 }),
    (0, typeorm_1.Column)({ length: 3000, nullable: true }),
    __metadata("design:type", String)
], ProjectsEntity.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The creation date of the project' }),
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ProjectsEntity.prototype, "creation_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The file associated with the project as a byte array' }),
    (0, typeorm_1.Column)('bytea', { nullable: false }),
    __metadata("design:type", Buffer)
], ProjectsEntity.prototype, "project_file", void 0);
exports.ProjectsEntity = ProjectsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'projects' })
], ProjectsEntity);
//# sourceMappingURL=projects.entity.js.map