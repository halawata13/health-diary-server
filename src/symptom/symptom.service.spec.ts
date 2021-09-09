import { Test, TestingModule } from '@nestjs/testing';
import { SymptomService } from './symptom.service';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Symptom } from './symptom.entity';
import { User } from '../user/user.entity';
import { DatabaseModule } from '../database.module';
import { userProviders } from '../user/user.providers';
import { symptomProviders } from './symptom.providers';
import { SymptomCreateDto, SymptomUpdateDto } from './symptom.dto';

describe('SymptomService', () => {
  let module: TestingModule;
  let service: SymptomService;
  let repository: Repository<Symptom>;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...userProviders,
        ...symptomProviders,
        SymptomService,
      ],
    }).compile();

    service = module.get<SymptomService>(SymptomService);
    repository = getRepository(Symptom);
    userRepository = getRepository(User);
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findAll', async () => {
    const user = await createUser('testUser');

    await Promise.all(Array.from(Array(3)).map(async (_, i) => {
      return await createSymptom(user, `symptom${i}`, `color${i}`);
    }));

    const result = await service.findAll(user.id);
    expect(result.length).toBe(3);
    expect(result[0].name).toBe('symptom0');
    expect(result[0].color).toBe('color0');
  });

  test('create', async () => {
    const user = await createUser('testUser');
    const params: SymptomCreateDto = {
      name: 'symptom',
      color: 'color',
    };

    const result = await service.create(user.id, params);
    expect(result.name).toBe(params.name);
    expect(result.color).toBe(params.color);
  });

  test('update', async () => {
    const user = await createUser('testUser');
    const symptom0 = await createSymptom(user, 'symptom', 'color');
    const symptom1 = await createSymptom(user, 'symptom', 'color');
    const params: SymptomUpdateDto = {
      id: symptom0.id,
      name: 'updatedName',
      color: 'updatedColor',
    };

    const result = await service.update(user.id, params);
    expect(result.name).toBe(params.name);
    expect(result.color).toBe(params.color);

    const another = await repository.findOne({ id: symptom1.id });
    expect(another.name).toBe(symptom1.name);
    expect(another.color).toBe(symptom1.color);
  });

  test('delete', async () => {
    const user = await createUser('testUser');
    const symptom = await createSymptom(user, 'symptom', 'color');

    await service.delete(user.id, symptom.id);
    const result = await repository.findOne({ id: symptom.id });
    expect(result).toBeUndefined();
  });

  const createUser = async (name: string) => {
    const user = await userRepository.create({
      name,
      email: name,
      password: name,
    });

    return userRepository.save(user);
  };

  const createSymptom = async (user: User, name: string, color: string) => {
    const symptom = repository.create({
      userId: user.id,
      name,
      color,
    });

    return repository.save(symptom);
  };
});
