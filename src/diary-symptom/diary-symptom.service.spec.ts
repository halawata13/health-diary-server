import { Test, TestingModule } from '@nestjs/testing';
import { DiarySymptomService } from './diary-symptom.service';

describe('DiarySymptomService', () => {
  let service: DiarySymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiarySymptomService],
    }).compile();

    service = module.get<DiarySymptomService>(DiarySymptomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
