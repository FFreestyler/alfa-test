import { Module } from '@nestjs/common';
import { TopDataController } from './topData.controller';
import { TopDataService } from './topData.service';

@Module({
  controllers: [TopDataController],
  providers: [TopDataService],
})
export class TopDataModule {}
