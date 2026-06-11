import { Body, Controller, Delete, Get, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { DayRatingService } from './day-rating.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';

@UseGuards(AuthGuard)
@Controller('day-ratings')
export class DayRatingController {
  constructor(private readonly dayRatingService: DayRatingService) {}

  @Get()
  getDays(@Query('year') year: string, @Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.dayRatingService.findUserYearRatings(year, userId);
  }

  @Patch()
  setDay(@Body() body: { date: string; rating: number }, @Req() request: AuthenticatedRequest) {
    const { date, rating } = body;
    const userId = request.user.id;

    return this.dayRatingService.setDayRating(date, userId, rating);
  }

  @Delete()
  removeDay(@Body() body: { date: string }, @Req() request: AuthenticatedRequest) {
    const { date } = body;
    const userId = request.user.id;

    return this.dayRatingService.deleteDayRating(date, userId);
  }
}
