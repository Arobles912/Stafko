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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs = require("bcryptjs");
const staff_service_1 = require("../../staff/staff/staff.service");
let AuthService = class AuthService {
    constructor(staffService, jwtService) {
        this.staffService = staffService;
        this.jwtService = jwtService;
    }
    async register({ username, pass, email }) {
        const user = await this.staffService.findOneByUserName(username);
        if (user) {
            throw new common_1.BadRequestException("Username already exists.");
        }
        const hashedPassword = await bcryptjs.hash(pass, 10);
        await this.staffService.create({
            username,
            pass: hashedPassword,
            email
        });
        return {
            message: "User created successfully.",
        };
    }
    async login({ username, pass }) {
        const user = await this.staffService.findOneByUserName(username);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid user");
        }
        const isPasswordValid = await bcryptjs.compare(pass, user.pass);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        const payload = { username: user.username };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
            username: user.username,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [staff_service_1.StaffService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map