import { Test, TestingModule } from "@nestjs/testing";
import { StaffService } from "./staff.service";
import { StaffEntity } from "../domain/entities/staff.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("StaffService", () => {
  let service: StaffService;
  let repository: Repository<StaffEntity>;

  const mockStaffRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneByUserName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: getRepositoryToken(StaffEntity),
          useValue: mockStaffRepository ,
        },
      ],
      imports: [],
    }).compile();

    service = module.get<StaffService>(StaffService);
    repository = module.get<Repository<StaffEntity>>(
      getRepositoryToken(StaffEntity)
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a staff member", async () => {
      const staffDto: StaffEntity = {
        staff_id: 1,
        username: "Test",
        pass: "1234",
        email: "Test@gmail.com",
        user_role: "Usuario",
      };
      const createdStaff: StaffEntity = {
        staff_id: 1,
        username: "Test",
        pass: "1234",
        email: "Test@gmail.com",
        user_role: "Usuario",
      };

      jest.spyOn(mockStaffRepository, "save").mockReturnValue(staffDto);

      const result = await service.create(staffDto);
      expect(result).toEqual(createdStaff);
    });
  });

  describe("findAll", () => {
    it("should return an array of staff members", async () => {
      const staffUser: StaffEntity = {
        staff_id: 1,
        username: "Test",
        pass: "1234",
        email: "test@gmail.com",
        user_role: "Usuario",
      };

      const staffUsers = [staffUser];
      jest.spyOn(mockStaffRepository, "find").mockReturnValue(staffUsers);

      const result = await service.findAll();
      expect(result).toEqual(staffUsers);
      expect(mockStaffRepository.find).toHaveBeenCalled();
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
  
      jest.spyOn(mockStaffRepository, "findOne").mockResolvedValue(expectedStaffMember);
  
      const result = await service.findOne(id);
      expect(result).toEqual(expectedStaffMember);
      expect(mockStaffRepository.findOne).toHaveBeenCalled();
      expect(mockStaffRepository.findOne).toHaveBeenCalledWith({ where: { staff_id: id } }); 
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

      jest.spyOn(mockStaffRepository, "update").mockResolvedValue(expectedStaffMember);

      const result = await service.update(id, staffMember);
      expect(mockStaffRepository.update).toHaveBeenCalled();
      expect(mockStaffRepository.update).toHaveBeenCalledWith(staffMember);

      expect(result).toEqual(expectedStaffMember);
    });
  });

  describe("remove", () => {
    it("should remove a staff user by a given id", async () => {
      const id = 1;

      mockStaffRepository.delete.mockResolvedValue({});

      await service.remove(id);

      expect(mockStaffRepository.delete).toHaveBeenCalledWith(id);
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

      jest.spyOn(mockStaffRepository, "findOneByUserName").mockResolvedValue(expectedStaffMember);

      const result = await service.findOneByUserName(username);
      expect(result).toEqual(expectedStaffMember);
      expect(mockStaffRepository.findOneByUserName).toHaveBeenCalled();
      expect(mockStaffRepository.findOneByUserName).toHaveBeenCalledWith({ where: { username: username } });
    });
  });
});
