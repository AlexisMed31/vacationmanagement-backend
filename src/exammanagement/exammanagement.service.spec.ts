import { Test, TestingModule } from '@nestjs/testing';
import { ExammanagementService } from './exammanagement.service';

describe('ExammanagementService', () => {
  let service: ExammanagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExammanagementService],
    }).compile();

    service = module.get<ExammanagementService>(ExammanagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
