import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DayRatingModule } from './day-rating/day-rating.module';

@Module({
  imports: [DayRatingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
