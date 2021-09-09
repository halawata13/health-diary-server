import { define } from 'typeorm-seeding';
import { DiarySymptom } from '../../diary-symptom/diary-symptom.entity';

define(DiarySymptom, faker => {
  const diarySymptom = new DiarySymptom();

  diarySymptom.level = faker.random.number({ min: 1, max: 10 });

  return diarySymptom;
});
