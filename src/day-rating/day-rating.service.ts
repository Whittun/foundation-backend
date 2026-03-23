import { Injectable } from '@nestjs/common';

@Injectable()
export class DayRatingService {
    findAll() {
      return {
        '2026-01-01': null,
        '2026-01-02': 2
      };
    }
}
