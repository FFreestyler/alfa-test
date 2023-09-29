import { Controller, Get } from '@nestjs/common';
import { TopDataService } from './topData.service';

@Controller('topData')
export class TopDataController {
  constructor(private readonly topDataService: TopDataService) {}

  @Get()
  async getAll() {
    return this.topDataService.getTop();
  }
}
