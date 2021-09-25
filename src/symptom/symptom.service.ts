import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Symptom } from './symptom.entity';
import { SymptomCreateDto, SymptomUpdateDto } from './symptom.dto';
import { DiarySymptom } from '../diary-symptom/diary-symptom.entity';
import { count } from "rxjs";

@Injectable()
export class SymptomService {
  constructor(
    @Inject('SYMPTOM_REPOSITORY')
    private symptomRepository: Repository<Symptom>,
  ) {
  }

  async findAll(userId: number) {
    const queryBuilder = this.symptomRepository.createQueryBuilder('');
    const subQuery = queryBuilder
      .subQuery()
      .select('COUNT(*)')
      .from(DiarySymptom, 'DS')
      .where('Symptom.id = DS.symptom_id')
      .getSql();

    const result = await queryBuilder
      .select('id', 'id')
      .addSelect('name', 'name')
      .addSelect('color', 'color')
      .addSelect(subQuery, 'count')
      .where({ userId })
      .getRawMany();

    return result.map(s => ({
        ...s,
        count: Number(s.count),
        isDeletable: s.count === '0',
    }));
  }

  async find(userId: number, id: number) {
    return this.symptomRepository.findOne({
      select: [
        'id',
        'name',
        'color',
      ],
      join: {
        alias: 'symptom',
        leftJoinAndSelect: {
          diarySymptoms: 'symptom.diarySymptoms',
        },
      },
      where: {
        id,
        userId,
      },
    });
  }

  async create(userId: number, params: SymptomCreateDto) {
    const symptom = await this.symptomRepository.create({
      ...params,
      userId,
    });

    return this.symptomRepository.save(symptom);
  }

  async update(userId: number, params: SymptomUpdateDto) {
    const symptom = await this.symptomRepository.findOne({
      id: params.id,
      userId: userId,
    });
    if (!symptom) {
      return null;
    }

    const updateParams = {
      ...symptom,
      ...params,
    };

    return this.symptomRepository.save(updateParams);
  }

  async delete(userId: number, id: number): Promise<Symptom | null> {
    const symptom = await this.symptomRepository.findOne({
      id,
      userId,
    });
    if (!symptom) {
      return null;
    }

    return this.symptomRepository.remove(symptom);
  }
}
