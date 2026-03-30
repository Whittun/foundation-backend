import { Injectable, BadRequestException } from '@nestjs/common';
import { getYearMap } from './utils/generate-year-map';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DayRating } from './day-rating.entity';
 
@Injectable()
export class DayRatingService {

  constructor(
    @InjectRepository(DayRating)
    private readonly dayRatingRepository: Repository<DayRating>,
  ) {}

  async findUserYearRatings(year: string) {
    const numYear = Number(year);

    if (Number.isNaN(numYear) || !Number.isInteger(numYear) || numYear < 1900 || numYear > 2100) {
      throw new BadRequestException('It is not valid year');
    }

    const userId = 1;
    const startDate = `${numYear}-01-01`;
    const endDate = `${numYear}-12-31`;

    const ratings = await this.dayRatingRepository.find({
      where: {
        userId,
        date: Between(startDate, endDate),
      },
    })

    const ratingsMap = getYearMap(numYear);

    ratings.forEach((rating) => {
      ratingsMap[rating.date] = rating.rating
    })

    return ratingsMap;
  }
}
