import { Injectable, BadRequestException } from '@nestjs/common';
import { getYearMap } from './utils/generate-year-map';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DayRating } from './day-rating.entity';
import { isValidDateFormat } from 'src/shared/utils/validate-date-format';

@Injectable()
export class DayRatingService {
  constructor(
    @InjectRepository(DayRating)
    private readonly dayRatingRepository: Repository<DayRating>,
  ) {}

  async findUserYearRatings(year: string, userId: number) {
    const numYear = Number(year);

    if (Number.isNaN(numYear) || !Number.isInteger(numYear) || numYear < 1900 || numYear > 2100) {
      throw new BadRequestException('The year must be between 1900 and 2100');
    }

    const startDate = `${numYear}-01-01`;
    const endDate = `${numYear}-12-31`;

    const ratings = await this.dayRatingRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate),
      },
    });

    const ratingsMap = getYearMap(numYear);

    ratings.forEach((rating) => {
      ratingsMap[rating.date] = rating.rating;
    });

    return ratingsMap;
  }

  async setDayRating(date: string, userId: number, rating: number) {
    if (!Number.isInteger(rating) || rating > 5 || rating < 1) {
      throw new BadRequestException('The rating must be between 1 and 5');
    }

    if (!isValidDateFormat(date)) {
      throw new BadRequestException('The date must be in the YYYY-MM-DD format');
    }

    const dayRating = await this.dayRatingRepository.findOne({
      where: {
        userId,
        date,
      },
    });

    if (dayRating) {
      dayRating.rating = rating;
      return this.dayRatingRepository.save(dayRating);
    }

    const newDayRating = this.dayRatingRepository.create({
      userId,
      date,
      rating,
    });

    return this.dayRatingRepository.save(newDayRating);
  }

  async deleteDayRating(date: string, userId: number) {
    if (!isValidDateFormat(date)) {
      throw new BadRequestException('The date must be in the YYYY-MM-DD format');
    }

    const dayRating = await this.dayRatingRepository.findOne({
      where: {
        userId,
        date,
      },
    });

    if (dayRating) {
      await this.dayRatingRepository.delete(dayRating.id);
      return { deleted: true };
    }

    return { deleted: false };
  }
}
