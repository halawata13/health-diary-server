import { define } from 'typeorm-seeding';
import { Symptom } from '../../symptom/symptom.entity';

define(Symptom, faker => {
  const symptom = new Symptom();

  symptom.name = faker.name.title();
  const r = faker.random.number(255).toString(16).padStart(2, '0');
  const g = faker.random.number(255).toString(16).padStart(2, '0');
  const b = faker.random.number(255).toString(16).padStart(2, '0');
  symptom.color = `#${r}${g}${b}`;

  return symptom;
});
