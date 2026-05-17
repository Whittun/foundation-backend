import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectiveGraphEntity } from './objective-graph.entity';

@Entity()
export class ObjectiveNodeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  graphId!: number;

  @ManyToOne(() => ObjectiveGraphEntity, (graph) => graph.nodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graphId' })
  graph!: ObjectiveGraphEntity;

  @Column()
  userId!: number;

  @Column()
  label!: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ type: 'float' })
  positionX!: number;

  @Column({ type: 'float' })
  positionY!: number;

  @Column({ default: 'objective' })
  type!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
