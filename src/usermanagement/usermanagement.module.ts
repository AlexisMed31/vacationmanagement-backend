import { Module } from '@nestjs/common';
import { UsermanagementController } from './usermanagement.controller';
import { UsermanagementService } from './usermanagement.service';

@Module({
  controllers: [UsermanagementController],
  providers: [UsermanagementService]
})
export class UsermanagementModule {}
