import { Test, TestingModule } from '@nestjs/testing';
import { StaffProjectController } from './staff_project.controller';

describe('StaffProjectController', () => {
  let controller: StaffProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffProjectController],
    }).compile();

    controller = module.get<StaffProjectController>(StaffProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
