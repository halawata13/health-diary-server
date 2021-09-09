import { Test, TestingModule } from '@nestjs/testing';
import { DiarySymptomController } from './diary-symptom.controller';

describe('DiarySymptomController', () => {
  let controller: DiarySymptomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiarySymptomController],
    }).compile();

    controller = module.get<DiarySymptomController>(DiarySymptomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
