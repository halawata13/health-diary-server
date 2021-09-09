import { createConnection } from 'typeorm';

let factory;

if (process.env.NODE_ENV !== 'test') {
  factory = () => createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'health_diary',
    password: 'health_diary',
    database: 'health_diary',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
  });
} else {
  factory = () => createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'health_diary',
    password: 'health_diary',
    database: 'health_diary_test',
    entities: [
      __dirname + '/**/*.entity{.ts,.js}',
    ],
    synchronize: false,
  });
}

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: factory,
  },
];
