import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectiveNodeEntity } from './objective-node.entity';
import { ObjectiveEdgeEntity } from './objective-edge.entity';

@Entity()
export class ObjectiveGraphEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @OneToMany(() => ObjectiveNodeEntity, (node) => node.graph)
  nodes!: ObjectiveNodeEntity[];

  @OneToMany(() => ObjectiveEdgeEntity, (edge) => edge.graph)
  edges!: ObjectiveEdgeEntity[];

  @Column({ default: 1 })
  version!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
