import { Test, TestingModule } from '@nestjs/testing';
import { ExammanagementController } from './exammanagement.controller';

describe('ExammanagementController', () => {
  let controller: ExammanagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExammanagementController],
    }).compile();

    controller = module.get<ExammanagementController>(ExammanagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
