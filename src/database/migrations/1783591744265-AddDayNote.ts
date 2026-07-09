import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDayNote1783591744265 implements MigrationInterface {
  name = 'AddDayNote1783591744265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "day_note" (
        "id" SERIAL NOT NULL,
        "userId" integer NOT NULL,
        "date" date NOT NULL,
        "contentJson" jsonb NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_day_note_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_day_note_userId_date" UNIQUE ("userId", "date")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "day_note"
      ADD CONSTRAINT "FK_day_note_userId"
      FOREIGN KEY ("userId")
      REFERENCES "user_entity"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "day_note"
      DROP CONSTRAINT "FK_day_note_userId"
    `);

    await queryRunner.query(`
      DROP TABLE "day_note"
    `);
  }
}
