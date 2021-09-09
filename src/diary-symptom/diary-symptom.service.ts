import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DiarySymptom } from './diary-symptom.entity';

@Injectable()
export class DiarySymptomService {
  constructor(
    @Inject('DIARY_SYMPTOM_REPOSITORY')
    private diarySymptomRepository: Repository<DiarySymptom>,
  ) {
  }
}
