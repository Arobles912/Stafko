import { Test, TestingModule } from "@nestjs/testing";
import { StaffService } from "./staff.service";
import { StaffEntity } from "../entity/staff.entity/staff.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("StaffService", () => {
  let service: StaffService;
  let repository: Repository<StaffEntity>;

  const mockStaffRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: getRepositoryToken(StaffEntity),
          useValue: mockStaffRepository,
        },
      ],
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
    it("should create a new staff member", async () => {
      const staffDto = {
        staff_id: 2,
        username: "Test",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      };
  
      const createdStaff: StaffEntity = {
        staff_id: 2,
        username: "Test",
        pass: "1234",
        email: "test@example.com",
        user_role: "Usuario",
      }; 
  
      mockStaffRepository.save.mockResolvedValue(staffDto);
  
      const result = await service.create(staffDto);
  
      expect(result).toEqual(createdStaff);
    });
  });
  

  describe("findAll", () => {
    it("should return an array of staff members", async () => {
      const staffMembers: StaffEntity[] = [
        {
          staff_id: 1,
          username: "Test1",
          pass: "1234",
          email: "test1@example.com",
          user_role: "Usuario",
        },
        {
          staff_id: 2,
          username: "Test2",
          pass: "5678",
          email: "test2@example.com",
          user_role: "Admin",
        },
      ];

      mockStaffRepository.find.mockResolvedValue(staffMembers);

      const result = await service.findAll();

      expect(result).toEqual(staffMembers);
    });
  });

  // describe('findOne', () => {
  //   it('should return a staff member by id', async () => {

  //     const staffId = 1;

  //     const result = await service.findOne(staffId);

  //     expect(result).toBeDefined();
  //     expect(result.staff_id).toEqual(staffId);
  //   });
  // });

  // describe('update', () => {
  //   it('should update a staff member', async () => {

  //     const staffId = 1;
  //     const updateDto = {
  //       username: 'UpdatedTest',
  //       pass: '5678',
  //       email: 'updated_test@example.com',
  //       user_role: 'Admin',
  //     };

  //     const result = await service.update(staffId, updateDto);

  //     expect(result).toBeTruthy();

  //   });
  // });

  // describe('remove', () => {
  //   it('should remove a staff member', async () => {

  //     const staffId = 1;

  //     const result = await service.remove(staffId);

  //     expect(result).toBeTruthy();

  //   });
  // });
});
