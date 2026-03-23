import { Test, TestingModule } from '@nestjs/testing';
import { DayRatingService } from './day-rating.service';

describe('DayRatingService', () => {
  let service: DayRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayRatingService],
    }).compile();

    service = module.get<DayRatingService>(DayRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
