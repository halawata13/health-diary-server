import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { Symptom } from '../symptom/symptom.entity';

@Entity('diary_symptoms')
export class DiarySymptom {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'diary_id',
    type: 'bigint',
  })
  diaryId: number;

  @Column({
    name: 'symptom_id',
    type: 'bigint',
  })
  symptomId: number;

  @Column()
  level: number;

  @ManyToOne(type => Diary)
  @JoinColumn({
    name: 'diary_id',
  })
  diary: Diary;

  @ManyToOne(type => Symptom)
  @JoinColumn({
    name: 'symptom_id',
  })
  symptom: Symptom;
}
