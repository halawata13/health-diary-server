import {MigrationInterface, QueryRunner} from "typeorm";

export class diaryModify1632052813444 implements MigrationInterface {
    name = 'diaryModify1632052813444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`health_diary\`.\`diaries\` CHANGE \`condition\` \`condition\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`health_diary\`.\`diaries\` CHANGE \`condition\` \`condition\` int NOT NULL`);
    }

}
