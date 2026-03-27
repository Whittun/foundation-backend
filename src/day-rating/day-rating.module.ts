import { Module } from '@nestjs/common';
import { DayRatingController } from './day-rating.controller';
import { DayRatingService } from './day-rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayRating } from './day-rating.entity';

@Module({
  controllers: [DayRatingController],
  providers: [DayRatingService],
  imports: [TypeOrmModule.forFeature([
    DayRating
  ])]
})
export class DayRatingModule {}
