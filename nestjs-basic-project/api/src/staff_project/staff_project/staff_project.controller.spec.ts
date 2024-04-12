import { Test, TestingModule } from "@nestjs/testing";
import { StaffProjectController } from "./staff_project.controller";
import { StaffProjectService } from "./staff_project.service";
import { StaffProjectDto } from "../dto/staff_project.dto/staff_project.dto";
import { StaffProjectEntity } from "../entity/staff_project.entity/staff_project.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("StaffProjectController", () => {
  let controller: StaffProjectController;
  let service: StaffProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffProjectController],
      providers: [
        StaffProjectService,
        { provide: getRepositoryToken(StaffProjectEntity), useValue: {} },
      ],
    }).compile();

    controller = module.get<StaffProjectController>(StaffProjectController);
    service = module.get<StaffProjectService>(StaffProjectService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new staff project", async () => {
      const staffProjectDto: StaffProjectDto = {
        staff_id: 1,
        project_id: 1,
      };
      const createdStaffProject: StaffProjectEntity = {
        staff_id: 1,
        project_id: 1,
      };

      jest.spyOn(service, "create").mockResolvedValue(createdStaffProject);

      const result = await controller.create(staffProjectDto);

      expect(result).toEqual(createdStaffProject);
      expect(service.create).toHaveBeenCalledWith(staffProjectDto);
    });
  });

  describe("findByStaffId", () => {
    it("should find projects by staff ID", async () => {
      const staffId = 1;
      const projects: StaffProjectEntity[] = [
        {
          staff_id: 1,
          project_id: 1,
        },
        {
          staff_id: 1,
          project_id: 2,
        },
      ];

      jest.spyOn(service, "findByStaffId").mockResolvedValue(projects);

      const result = await controller.findByStaffId(staffId);
      expect(result).toEqual(projects);
      expect(service.findByStaffId).toHaveBeenCalledWith(staffId);
    });
  });

  describe("findByProjectId", () => {
    it("should find projects by project ID", async () => {
      const projectId = 1;
      const projects: StaffProjectEntity[] = [
        {
          staff_id: 1,
          project_id: 1,
        },
        {
          staff_id: 1,
          project_id: 2,
        },
      ];

      jest.spyOn(service, "findByProjectId").mockResolvedValue(projects);

      const result = await controller.findByProjectId(projectId);
      expect(result).toEqual(projects);
      expect(service.findByProjectId).toHaveBeenCalledWith(projectId);
    });
  });
});
