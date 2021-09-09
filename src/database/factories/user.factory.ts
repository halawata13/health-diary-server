import bcrypt = require("bcrypt");
import { define } from 'typeorm-seeding';
import { User } from '../../user/user.entity';

define(User, (faker => {
  const user = new User();
  const name = faker.name.lastName();
  user.name = name;
  user.password = bcrypt.hashSync(name, 10);
  user.email = faker.internet.email();

  return user;
}));
