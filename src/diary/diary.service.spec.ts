import { Test, TestingModule } from '@nestjs/testing';
import { DiaryService } from './diary.service';
import { getConnection, getRepository, Repository } from 'typeorm';
import { Diary } from './diary.entity';
import { User } from '../user/user.entity';
import { DatabaseModule } from '../database.module';
import { diaryProviders } from './diary.providers';
import { userProviders } from '../user/user.providers';
import { Symptom } from '../symptom/symptom.entity';
import { symptomProviders } from '../symptom/symptom.providers';

describe('DiaryService', () => {
  let module: TestingModule;
  let service: DiaryService;
  let repository: Repository<Diary>;
  let userRepository: Repository<User>;
  let symptomRepository: Repository<Symptom>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...diaryProviders,
        DiaryService,
        ...userProviders,
        ...symptomProviders,
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
    repository = getRepository(Diary);
    userRepository = getRepository(User);
    symptomRepository = getRepository(Symptom);
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

  test('find', async () => {
    const user = await createUser('testUser');
    const symptoms: Symptom[] = await Promise.all(Array.from(Array(3)).map(async (_, i) => {
      return await createSymptom(user, `symptom${i}`, `color${i}`);
    }));

    await createDiary(user, 'memo', 100, new Date(2021, 7, 10), symptoms);
    await createDiary(user, 'memo', 100, new Date(2021, 7, 12), symptoms);
    await createDiary(user, 'memo', 100, new Date(2021, 8, 10), symptoms);

    let result = await service.find(user.id, new Date(2021, 7, 10), new Date(2021, 7, 12));
    expect(result.length).toBe(2);
    expect(result[0].memo).toBe('memo');
    expect(result[0].condition).toBe(100);
    expect(result[0].symptoms.length).toBe(3);

    result = await service.find(user.id, new Date(2021, 7, 11), new Date(2021, 8, 10));
    expect(result.length).toBe(2);

    result = await service.find(user.id, new Date(2021, 7, 10), new Date(2021, 7, 10));
    expect(result.length).toBe(1);

    result = await service.find(user.id, new Date(2021, 6, 11), new Date(2021, 7, 9));
    expect(result.length).toBe(0);
  });

  test('create', async () => {
    const user = await createUser('testUser');
  });

  const createUser = async (name: string) => {
    const user = await userRepository.create({
      name,
      email: name,
      password: name,
    });

    return userRepository.save(user);
  };

  const createDiary = async (user: User, memo: string, condition: number, date: Date, symptoms: Symptom[]) => {
    const diary = await repository.create({
      userId: user.id,
      memo,
      condition,
      date,
      symptoms,
    });

    return repository.save(diary);
  };

  const createSymptom = async (user: User, name: string, color: string) => {
    const symptom = symptomRepository.create({
      userId: user.id,
      name,
      color,
    });

    return symptomRepository.save(symptom);
  };
});
