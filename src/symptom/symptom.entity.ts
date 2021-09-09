import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { DiarySymptom } from '../diary-symptom/diary-symptom.entity';

@Entity('symptoms')
export class Symptom {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(type => DiarySymptom, diarySymptom => diarySymptom.symptom)
  diarySymptoms: DiarySymptom[];
}
