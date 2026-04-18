import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { DayRatingService } from './day-rating.service';

@Controller('day-ratings')
export class DayRatingController {
  constructor(private readonly dayRatingService: DayRatingService) {}

  @Get()
  getDays(@Query('year') year: string) {
    return this.dayRatingService.findUserYearRatings(year);
  }

  @Patch()
  setDay(@Body() body: { date: string; rating: number }) {
    const { date, rating } = body;

    return this.dayRatingService.setDayRating(date, rating);
  }

  @Delete()
  removeDay(@Body() body: { date: string }) {
    const { date } = body;

    return this.dayRatingService.deleteDayRating(date);
  }
}
