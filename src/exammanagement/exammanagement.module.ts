import { Module } from '@nestjs/common';
import { ExammanagementController } from './exammanagement.controller';
import { ExammanagementService } from './exammanagement.service';

@Module({
  controllers: [ExammanagementController],
  providers: [ExammanagementService]
})
export class ExammanagementModule {}
