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
exports.StaffEntity = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
let StaffEntity = class StaffEntity {
};
exports.StaffEntity = StaffEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The unique identifier of the staff member' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffEntity.prototype, "staff_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The username of the staff member' }),
    (0, typeorm_1.Column)({ length: 30, nullable: false }),
    __metadata("design:type", String)
], StaffEntity.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The password of the staff member' }),
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], StaffEntity.prototype, "pass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The email of the staff member' }),
    (0, typeorm_1.Column)({ length: 50, nullable: false }),
    __metadata("design:type", String)
], StaffEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The role of the staff member' }),
    (0, typeorm_1.Column)({ default: 'Usuario', length: 30 }),
    __metadata("design:type", String)
], StaffEntity.prototype, "user_role", void 0);
exports.StaffEntity = StaffEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'staff' })
], StaffEntity);
//# sourceMappingURL=staff.entity.js.map