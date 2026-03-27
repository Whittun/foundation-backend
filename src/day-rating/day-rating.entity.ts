import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DayRating {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({type: 'date'})
  date: Date;

  @Column()
  rating: number;
}