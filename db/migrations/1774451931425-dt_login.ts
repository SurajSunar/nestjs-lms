import { MigrationInterface, QueryRunner } from "typeorm";

export class DtLogin1774451931425 implements MigrationInterface {
    name = 'DtLogin1774451931425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
    }

}
