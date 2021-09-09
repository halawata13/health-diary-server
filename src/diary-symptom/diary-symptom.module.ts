import { Module } from '@nestjs/common';
import { DiarySymptomService } from './diary-symptom.service';
import { DiarySymptomController } from './diary-symptom.controller';
import { DatabaseModule } from '../database.module';
import { diarySymptomProviders } from './diary-symptom.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...diarySymptomProviders,
    DiarySymptomService,
  ],
  controllers: [DiarySymptomController]
})
export class DiarySymptomModule {}
