import { define } from 'typeorm-seeding';
import { Diary } from '../../diary/diary.entity';

const date = new Date();

define(Diary, faker => {
  const diary = new Diary();

  diary.condition = faker.datatype.number({ min: -100, max: 100 });
  diary.memo = faker.lorem.text();
  date.setTime(date.getTime() - 1000 * 60 * 60 * 24);
  diary.date = date;

  return diary;
});
