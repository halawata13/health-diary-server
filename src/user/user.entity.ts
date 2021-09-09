import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Diary } from '../diary/diary.entity';
import { Symptom } from '../symptom/symptom.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: number;

  @OneToMany(type => Diary, diary => diary.user)
  diaries: Diary[];

  @OneToMany(type => Symptom, symptom => symptom.user)
  symptoms: Symptom[];
}
