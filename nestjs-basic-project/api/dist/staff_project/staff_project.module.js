"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffProjectModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_project_controller_1 = require("./staff_project/staff_project.controller");
const staff_project_service_1 = require("./staff_project/staff_project.service");
const staff_project_entity_1 = require("./entity/staff_project.entity/staff_project.entity");
let StaffProjectModule = class StaffProjectModule {
};
exports.StaffProjectModule = StaffProjectModule;
exports.StaffProjectModule = StaffProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_project_entity_1.StaffProjectEntity])],
        controllers: [staff_project_controller_1.StaffProjectController],
        providers: [staff_project_service_1.StaffProjectService],
        exports: [staff_project_service_1.StaffProjectService]
    })
], StaffProjectModule);
//# sourceMappingURL=staff_project.module.js.map