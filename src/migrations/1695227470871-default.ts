import { MigrationInterface, QueryRunner } from "typeorm";

export class default1695227470871 implements MigrationInterface {
    name = 'default1695227470871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consultas\` DROP FOREIGN KEY \`FK_82fe7e7882d3a518dc4ebfd7916\``);
        await queryRunner.query(`ALTER TABLE \`anamneses\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`anamneses\` DROP COLUMN \`codAnam\``);
        await queryRunner.query(`ALTER TABLE \`anamneses\` ADD \`codAnam\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`consultas\` ADD CONSTRAINT \`FK_82fe7e7882d3a518dc4ebfd7916\` FOREIGN KEY (\`anamnese_codAnam\`) REFERENCES \`anamneses\`(\`codAnam\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consultas\` DROP FOREIGN KEY \`FK_82fe7e7882d3a518dc4ebfd7916\``);
        await queryRunner.query(`ALTER TABLE \`anamneses\` DROP COLUMN \`codAnam\``);
        await queryRunner.query(`ALTER TABLE \`anamneses\` ADD \`codAnam\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`anamneses\` ADD PRIMARY KEY (\`codAnam\`)`);
        await queryRunner.query(`ALTER TABLE \`consultas\` ADD CONSTRAINT \`FK_82fe7e7882d3a518dc4ebfd7916\` FOREIGN KEY (\`anamnese_codAnam\`) REFERENCES \`anamneses\`(\`codAnam\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
