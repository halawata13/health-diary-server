import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Symptom } from './symptom.entity';
import { SymptomCreateDto, SymptomGetDto, SymptomUpdateDto } from './symptom.dto';
import { DiarySymptom } from '../diary-symptom/diary-symptom.entity';
import { Diary } from "../diary/diary.entity";
import { DateTime } from "luxon";

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
      .orderBy('count', 'DESC')
      .getRawMany();

    return result.map(s => ({
        ...s,
        count: Number(s.count),
        isDeletable: s.count === '0',
    }));
  }

  async find(userId: number, params: SymptomGetDto) {
    const symptom = await this.symptomRepository.findOne(params.id);
    if (!symptom) {
      return null;
    }

    const query = await this.symptomRepository.createQueryBuilder('s')
      .select('s.id', 'id')
      .addSelect('s.name', 'name')
      .addSelect('s.color', 'color')
      .addSelect('ds.level', 'level')
      .addSelect('d.date', 'date')
      .leftJoin(DiarySymptom, 'ds', 'ds.symptom_id = s.id')
      .leftJoin(Diary, 'd', 'ds.diary_id = d.id')
      .where('s.id = :id', { id: params.id })
      .andWhere('s.user_id = :userId', { userId })
      .orderBy('date', 'ASC');

    if (params.fromYear !== undefined && params.fromMonth !== undefined && params.toYear !== undefined && params.toMonth !== undefined) {
      query.andWhere('d.date >= :from', { from: `${params.fromYear}-${params.fromMonth}-01` });
      const to = DateTime
        .fromFormat(`${params.toYear}-${String(params.toMonth).padStart(2, '0')}-01`, 'yyyy-MM-dd')
        .plus({ months: 1 })
        .toFormat('yyyy-MM-dd');
      query.andWhere('d.date < :to', { to });
    }

    const result = await query.getRawMany();

    const diarySymptoms = result.map(row => ({
      level: row.level,
      date: row.date,
    }));

    return {
      id: symptom.id,
      name: symptom.name,
      color: symptom.color,
      diarySymptoms,
    }
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
      where: {
        id: params.id,
        userId: userId,
      },
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
      where: {
        id,
        userId,
      },
    });
    if (!symptom) {
      return null;
    }

    return this.symptomRepository.remove(symptom);
  }
}
