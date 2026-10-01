import { MigrationInterface, QueryRunner } from 'typeorm';

export class Task1789124212052 implements MigrationInterface {
  name = 'Task1789124212052';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL DEFAULT '', "startDate" date NOT NULL, "schedule" jsonb NOT NULL, "completedDate" date, "userId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
