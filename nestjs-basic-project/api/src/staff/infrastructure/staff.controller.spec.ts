import { Test, TestingModule } from "@nestjs/testing";
import { StaffController } from "./staff.controller";
import { StaffService } from "../application/staff.service";
import { StaffEntity } from "../domain/entities/staff.entity";
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
        username: "Test",
        pass: "1234",
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

      jest.spyOn(service, "create").mockResolvedValue(staffDto);

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

  describe("findOne", () => {
    it("should find a staff member by a given ID and return its data", async () => {
      const id = 123;
      const expectedStaffMember: StaffEntity = {
        staff_id: 123,
        username: "TestUser",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };

      const mockStaffService = {
        findOne: jest.fn(() => Promise.resolve(expectedStaffMember)),
      };

      controller = new StaffController(mockStaffService as any);

      const actualStaffMember = await controller.findOne(id);

      expect(actualStaffMember.staff_id).toEqual(id);

      expect(mockStaffService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe("update", () => {
    it("should find a staff user by a given id and update its data", async () => {
      const id = 1;
      const staffMember = {
        username: "TestUser",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };
  
      const expectedStaffMember = {
        staff_id: 1,
        username: "TestUser",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };
  
      const mockStaffService = {
        update: jest.fn((id: number, staffMember: any) => Promise.resolve({
          ...expectedStaffMember,
          ...staffMember, 
        })),
      };
      
  
      controller = new StaffController(mockStaffService as any);
  
      const actualStaffMember = await controller.update(id, staffMember);
  
      expect(mockStaffService.update).toHaveBeenCalledWith(id, staffMember);

      expect(actualStaffMember).toEqual(expectedStaffMember);
    });
  });

  describe("remove", () => {
    it("should remove a staff user by a given id", async () => {
      const id = 1;
      const staffMember = {
        staff_id: 1,
        username: "TestUser",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };
  
      const mockStaffService = {
        remove: jest.fn((id: number) => Promise.resolve(staffMember)), 
      };
  
      controller = new StaffController(mockStaffService as any);
  
      await controller.remove(id);
      
      expect(staffMember.staff_id).toEqual(id);
  
      expect(mockStaffService.remove).toHaveBeenCalledWith(id);
    });
  });

  describe("findOneByUserName", () => {
    it("should find a staff member by a given username and return its data", async () => {
      const username = "TestUser";
      const expectedStaffMember: StaffEntity = {
        staff_id: 123,
        username: "TestUser",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };

      const mockStaffService = {
        findOneByUserName: jest.fn(() => Promise.resolve(expectedStaffMember)),
      };

      controller = new StaffController(mockStaffService as any);

      const actualStaffMember = await controller.findOneByUserName(username);

      expect(actualStaffMember.username).toEqual(username);

      expect(mockStaffService.findOneByUserName).toHaveBeenCalledWith(username);
    });
  });
  
  
});
