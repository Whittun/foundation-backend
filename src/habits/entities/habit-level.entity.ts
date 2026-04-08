import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HabitEntity } from "./habit.entity";

@Entity()
export class HabitLevelEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => HabitEntity, {
    onDelete: "CASCADE",
  })
  habit!: HabitEntity;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: 0 })
  progress!: number;

  @Column()
  target!: number;

  @Column()
  level!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
