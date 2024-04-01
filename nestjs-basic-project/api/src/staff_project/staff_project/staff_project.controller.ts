import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { StaffProjectService } from "./staff_project.service";
import { StaffProjectDto } from "../dto/staff_project.dto/staff_project.dto";
import { StaffProjectEntity } from "../entity/staff_project.entity/staff_project.entity";

@Controller("api/staffProject")
export class StaffProjectController {
  constructor(private readonly staffProjectService: StaffProjectService) {}

  @Post()
  async create(
    @Body() staffProjectDto: StaffProjectDto
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.create(staffProjectDto);
  }

  @Get("staff/:staffId")
  async findByStaffId(
    @Param("staffId") staffId: number
  ): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findByStaffId(staffId);
  }

  @Get("project/:projectId")
  async findByProjectId(
    @Param("projectId") projectId: number
  ): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findByProjectId(projectId);
  }

  @Get("project/:projectId/users")
  async findUsersByProjectId(
    @Param("projectId") projectId: number
  ): Promise<string[]> {
    try {
      const members = await this.staffProjectService.findByProjectId(projectId);

      const usernames = await Promise.all(
        members.map(async (member) => {
          const user = await this.staffProjectService.findUserById(
            member.staff_id
          );
          return user ? user.username : null;
        })
      );

      return usernames.filter((username) => username !== null);
    } catch (error) {
      console.error("Error fetching users by project ID:", error.message);
      throw new Error("Failed to fetch users");
    }
  }

  @Get(":staffId/:projectId")
  async findOne(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.findOne(+staffId, +projectId);
  }

  @Get()
  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findAll();
  }

  @Put(":staffId/:projectId")
  async update(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number,
    @Body() staffProjectDto: StaffProjectDto
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.update(
      +staffId,
      +projectId,
      staffProjectDto
    );
  }

  @Delete(":staffId/:projectId")
  async remove(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number
  ): Promise<void> {
    return this.staffProjectService.remove(+staffId, +projectId);
  }
}
