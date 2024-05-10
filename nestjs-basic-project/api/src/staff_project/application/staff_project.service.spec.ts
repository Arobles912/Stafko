import { Test, TestingModule } from '@nestjs/testing';
import { StaffProjectService } from './staff_project.service';

describe('StaffProjectService', () => {
  let service: StaffProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffProjectService],
    }).compile();

    service = module.get<StaffProjectService>(StaffProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
