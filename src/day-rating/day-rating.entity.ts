import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Index(['userId', 'date'], { unique: true })
@Entity()
export class DayRating {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({type: 'date'})
  date!: string;

  @Column()
  rating!: number;
}