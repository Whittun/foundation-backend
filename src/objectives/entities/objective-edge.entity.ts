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
export class ObjectiveEdgeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @Column()
  graphId!: number;

  @ManyToOne(() => ObjectiveGraphEntity, (graph) => graph.edges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'graphId' })
  graph!: ObjectiveGraphEntity;

  @Column()
  userId!: number;

  @Column()
  sourceNodeId!: string;

  @Column()
  targetNodeId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
