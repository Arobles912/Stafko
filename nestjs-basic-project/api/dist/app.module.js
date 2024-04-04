"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const projects_module_1 = require("./projects/projects.module");
const staff_module_1 = require("./staff/staff.module");
const auth_module_1 = require("./auth/auth.module");
const staff_project_module_1 = require("./staff_project/staff_project.module");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            projects_module_1.ProjectsModule,
            staff_module_1.StaffModule,
            auth_module_1.AuthModule,
            staff_project_module_1.StaffProjectModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "user",
                password: "password",
                database: "dbname",
                autoLoadEntities: true,
                synchronize: true,
            }),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map