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
exports.ProjectsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProjectsDto {
}
exports.ProjectsDto = ProjectsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The name of the project.', example: 'My Project' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProjectsDto.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The description of the project.', example: 'This is a sample project.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The creation date of the project.', example: '2022-04-01T12:00:00.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], ProjectsDto.prototype, "creation_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The file attached to the project.', type: 'string', format: 'binary' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Buffer)
], ProjectsDto.prototype, "project_file", void 0);
//# sourceMappingURL=projects.dto.js.map