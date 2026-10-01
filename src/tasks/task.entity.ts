import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../users/entities/user.entity';

export enum ScheduleType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export type TaskSchedule = {
  type: ScheduleType;
  every: number;
  days?: number[];
};

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', default: '' })
  description!: string;

  @Column({ type: 'date' })
  startDate!: string;

  @Column({ type: 'jsonb' })
  schedule!: TaskSchedule;

  @Column({ type: 'date', nullable: true })
  completedDate!: string | null;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user!: UserEntity;
}
