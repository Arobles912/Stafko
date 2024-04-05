import { Test, TestingModule } from "@nestjs/testing";
import { StaffController } from "./staff.controller";
import { StaffService } from "./staff.service";
import { StaffEntity } from "../entity/staff.entity/staff.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("StaffController", () => {
  let controller: StaffController;
  let service: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [
        StaffService,
        { provide: getRepositoryToken(StaffEntity), useValue: {} },
      ],
      imports: [],
    }).compile();

    controller = module.get<StaffController>(StaffController);
    service = module.get<StaffService>(StaffService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a staff member", async () => {
      const staffDto: StaffEntity = {
        staff_id: null,
        username: "Testsvdfsv",
        pass: "1234dfvfdsf",
        email: "Test@gmail.com",
        user_role: "Usuario",
      };
      const createdStaff: StaffEntity = {
        staff_id: null,
        username: "Test",
        pass: "1234",
        email: "Test@gmail.com",
        user_role: "Usuario",
      };
  
      jest.spyOn(service, "create").mockResolvedValue(createdStaff);

      await expect(controller.create(staffDto)).resolves.toEqual(createdStaff);
    });
  });
  
  describe("create", () => {
    it("should create a staff member with a default role", async () => {
      const staffDto = {
        staff_id: null,
        username: "Test",
        pass: "1234",
        email: "Test@gmail.com",
        user_role: null,
      };
      const createdStaff: StaffEntity = {
        staff_id: null,
        username: "Test",
        pass: "1234",
        email: "Test@gmail.com",
        user_role: "Usuario",
      };

      jest.spyOn(service, "create").mockResolvedValue(createdStaff);

      await expect(controller.create(staffDto)).resolves.toEqual(createdStaff);
    });
  });

  describe("findAll", () => {
    it("should return an array of staff members", async () => {
      const staffList: StaffEntity[] = [
        {
          staff_id: 1,
          username: "Test",
          pass: "1234",
          email: "test@gmail.com",
          user_role: "Usuario",
        },
        {
          staff_id: 2,
          username: "Test2",
          pass: "12345",
          email: "test2@gmail.com",
          user_role: "Usuario",
        },
      ];

      jest.spyOn(service, "findAll").mockResolvedValue(staffList);

      await expect(controller.findAll()).resolves.toEqual(staffList);
    });
  });
});
