import { Inject, Injectable } from '@nestjs/common';
import { Between, getConnection, Repository } from 'typeorm';
import { Diary } from './diary.entity';
import { DiaryCreateDto, DiaryUpdateDto } from './diary.dto';
import { DiarySymptom } from '../diary-symptom/diary-symptom.entity';
import { Symptom } from '../symptom/symptom.entity';

@Injectable()
export class DiaryService {
  constructor(
    @Inject('DIARY_REPOSITORY')
    private readonly diaryRepository: Repository<Diary>,
    @Inject('DIARY_SYMPTOM_REPOSITORY')
    private readonly diarySymptomRepository: Repository<DiarySymptom>,
    @Inject('SYMPTOM_REPOSITORY')
    private readonly symptomRepository: Repository<Symptom>,
  ) {
  }

  find(userId: number, from: Date, to: Date) {
    return this.diaryRepository.find({
      select: [
        'id',
        'date',
        'condition',
        'memo',
      ],
      join: {
        alias: 'diary',
        leftJoinAndSelect: {
          diarySymptoms: 'diary.symptoms',
          symptoms: 'diarySymptoms.symptom',
        },
      },
      where: {
        userId,
        date: Between(from, to),
      },
    });
  }

  async create(userId: number, params: DiaryCreateDto) {
    return getConnection().transaction(async _ => {
      // 日記の更新
      const diary = await this.diaryRepository.save(await this.diaryRepository.create({
        ...params,
        userId,
      }));

      // 日記症状の登録
      const symptoms = this.updateDiarySymptoms(userId, params, diary);

      return {
        ...diary,
        symptoms,
      };
    });
  }

  async update(userId: number, params: DiaryUpdateDto) {
    return getConnection().transaction(async _ => {
      const diary = await this.diaryRepository.findOne({
        id: params.id,
        userId: userId,
      });
      if (!diary) {
        return null;
      }

      const updateParams = {
        ...diary,
        id: diary.id,
        memo: params.memo,
        condition: params.condition,
      };

      // 日記の更新
      await this.diaryRepository.save(updateParams);

      // 日記症状の登録
      const symptoms = this.updateDiarySymptoms(userId, params, diary);

      return {
        ...diary,
        symptoms,
      };
    });
  }

  private async updateDiarySymptoms(userId: number, params: DiaryCreateDto | DiaryUpdateDto, diary: Diary) {
    // 日記症状の削除
    const deleteSymptoms = await this.diarySymptomRepository.findByIds(params.deleteSymptoms.map(s => s.id));
    await this.diarySymptomRepository.remove(deleteSymptoms);

    // 日記症状の登録
    return await Promise.all(params.symptoms.map(async diarySymptom => {
      let symptomId = diarySymptom.symptomId;

      // 存在しない症状の場合は新規登録
      if (diarySymptom.symptomId === undefined) {
        const symptom = await this.symptomRepository.save(await this.symptomRepository.create({
          userId,
          name: diarySymptom.name,
          color: diarySymptom.color ?? '#999',
        }));

        symptomId = symptom.id;
      }

      return await this.diarySymptomRepository.save(await this.diarySymptomRepository.create({
        diaryId: diary.id,
        symptomId: symptomId,
        level: diarySymptom.level,
      }));
    }));
  }
}
