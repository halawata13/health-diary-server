import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../user/user.entity';
import { Symptom } from '../../symptom/symptom.entity';

export default class DummySeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const users = await factory(User)().createMany(10);

    await Promise.all(users.map(async user => {
      await factory(Symptom)().createMany(100, { userId: user.id });
    }));
  }
}
