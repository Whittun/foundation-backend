import { Injectable, BadRequestException } from '@nestjs/common';
import { getYearMap } from './utils/generate-year-map';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayRating } from './day-rating.entity';
 
@Injectable()
export class DayRatingService {

  constructor(
    @InjectRepository(DayRating)
    private readonly dayRatingRepository: Repository<DayRating>,
  ) {}

  findUserYearRating(year: string) {
    const numYear = Number(year);

    if (Number.isNaN(numYear) || !Number.isInteger(numYear) || numYear < 1900 || numYear > 2100) {
      throw new BadRequestException('It is not valid year');
    }

    const userId = 1;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    return getYearMap(numYear);
  }
}
