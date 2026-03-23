import { Test, TestingModule } from '@nestjs/testing';
import { DayRatingController } from './day-rating.controller';

describe('DayRatingController', () => {
  let controller: DayRatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayRatingController],
    }).compile();

    controller = module.get<DayRatingController>(DayRatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
