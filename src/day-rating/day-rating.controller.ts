import { Controller, Get, Query } from '@nestjs/common';
import {DayRatingService} from './day-rating.service';

@Controller('day-ratings')
export class DayRatingController {
  constructor(private readonly dayRatingService: DayRatingService) {}

  @Get()
  getDays (@Query('year') year: string) {
    return this.dayRatingService.findAll(year);
  }
}
