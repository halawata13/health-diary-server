import { Connection } from 'typeorm';
import { DiarySymptom } from './diary-symptom.entity';

export const diarySymptomProviders = [
  {
    provide: 'DIARY_SYMPTOM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(DiarySymptom),
    inject: ['DATABASE_CONNECTION'],
  },
];
