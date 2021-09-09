import { Connection } from 'typeorm';
import { Diary } from './diary.entity';

export const diaryProviders = [
  {
    provide: 'DIARY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Diary),
    inject: ['DATABASE_CONNECTION'],
  },
];
