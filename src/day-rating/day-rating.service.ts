import { Injectable } from '@nestjs/common';

import { getYearMap } from './utils/generate-year-map';
 
@Injectable()
export class DayRatingService {
  findAll(year: string) {

    if (Number.isNaN(Number(year))) throw new Error('It is not valid year');

    return getYearMap(Number(year));
  }
}
