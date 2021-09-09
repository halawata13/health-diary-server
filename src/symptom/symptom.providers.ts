import { Connection } from 'typeorm';
import { Symptom } from './symptom.entity';

export const symptomProviders = [
  {
    provide: 'SYMPTOM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Symptom),
    inject: ['DATABASE_CONNECTION'],
  },
];
