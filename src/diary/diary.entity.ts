import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { DiarySymptom } from '../diary-symptom/diary-symptom.entity';

@Entity('diaries')
export class Diary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'user_id',
    type: 'bigint',
  })
  userId: number;

  @Column({ type: 'text' })
  memo: string;

  @Column({ nullable: true })
  condition: number;

  @Column({ type: 'date' })
  date: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @ManyToOne(type => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(type => DiarySymptom, diarySymptom => diarySymptom.diary)
  symptoms: DiarySymptom[];
}
