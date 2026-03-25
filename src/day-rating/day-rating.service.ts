import { Injectable } from '@nestjs/common';

import { BadRequestException } from '@nestjs/common';

import { getYearMap } from './utils/generate-year-map';
 
@Injectable()
export class DayRatingService {
  findAll(year: string) {
    const numYear = Number(year);

    if (Number.isNaN(numYear) || !Number.isInteger(numYear) || numYear < 1900 || numYear > 2100) {
      throw new BadRequestException('It is not valid year');
    }
    return getYearMap(numYear);
  }
}
