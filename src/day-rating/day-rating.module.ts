import { Module } from '@nestjs/common';
import { DayRatingController } from './day-rating.controller';
import { DayRatingService } from './day-rating.service';

@Module({
  controllers: [DayRatingController],
  providers: [DayRatingService]
})
export class DayRatingModule {}
