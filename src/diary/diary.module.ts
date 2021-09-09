import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { DatabaseModule } from '../database.module';
import { diaryProviders } from './diary.providers';
import { diarySymptomProviders } from '../diary-symptom/diary-symptom.providers';
import { symptomProviders } from '../symptom/symptom.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...diaryProviders,
    DiaryService,
    ...diarySymptomProviders,
    ...symptomProviders,
  ],
  controllers: [DiaryController]
})
export class DiaryModule {}
