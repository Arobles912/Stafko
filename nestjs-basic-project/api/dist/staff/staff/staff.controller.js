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
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const staff_dto_1 = require("../dto/staff.dto/staff.dto");
const staff_entity_1 = require("../entity/staff.entity/staff.entity");
const swagger_1 = require("@nestjs/swagger");
let StaffController = class StaffController {
    constructor(staffService) {
        this.staffService = staffService;
    }
    async create(staffDto) {
        return this.staffService.create(staffDto);
    }
    async findAll() {
        return this.staffService.findAll();
    }
    async findOne(id) {
        return this.staffService.findOne(+id);
    }
    async update(id, staffDto) {
        return this.staffService.update(+id, staffDto);
    }
    async remove(id) {
        return this.staffService.remove(+id);
    }
    async findOneByUserName(username) {
        return this.staffService.findOneByUserName(username);
    }
};
exports.StaffController = StaffController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new staff member.' }),
    (0, swagger_1.ApiBody)({ type: staff_dto_1.StaffDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the created staff member.', type: staff_entity_1.StaffEntity }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error occurred while trying to create the staff member.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [staff_dto_1.StaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all staff members.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns an array with all the staff members.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get staff member by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff member ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the staff member specified by the ID.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Staff not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update staff member by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff member ID.' }),
    (0, swagger_1.ApiBody)({ type: staff_dto_1.StaffDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the updated staff member specified by the ID.', type: staff_entity_1.StaffEntity }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error occurred while trying to update the staff member.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, staff_dto_1.StaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete staff member by ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Staff member ID.' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Deletes the staff member specified by the ID.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'An error occurred while trying to delete the staff member.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    (0, swagger_1.ApiOperation)({ summary: 'Get staff member by username.' }),
    (0, swagger_1.ApiParam)({ name: 'username', description: 'Staff member username.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the staff member specified by the username.' }),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findOneByUserName", null);
exports.StaffController = StaffController = __decorate([
    (0, swagger_1.ApiTags)('staff'),
    (0, common_1.Controller)('api/staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService])
], StaffController);
//# sourceMappingURL=staff.controller.js.map