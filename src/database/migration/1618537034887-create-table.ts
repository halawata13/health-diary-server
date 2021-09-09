import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1618537034887 implements MigrationInterface {
    name = 'createTable1618537034887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `symptoms` (`id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint NOT NULL, `name` varchar(255) NOT NULL, `color` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` bigint NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diaries` (`id` bigint NOT NULL AUTO_INCREMENT, `user_id` bigint NOT NULL, `memo` text NOT NULL, `condition` int NOT NULL, `date` date NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `diary_symptoms` (`id` bigint NOT NULL AUTO_INCREMENT, `diary_id` bigint NOT NULL, `symptom_id` bigint NOT NULL, `level` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `symptoms` ADD CONSTRAINT `FK_2e71f3acf01760171725ec17bb3` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diaries` ADD CONSTRAINT `FK_648dd552daded36f58a30ca0932` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diary_symptoms` ADD CONSTRAINT `FK_38e3f15b9640130bf3220616bab` FOREIGN KEY (`diary_id`) REFERENCES `diaries`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `diary_symptoms` ADD CONSTRAINT `FK_19579ca0f886473d25ecbd84af9` FOREIGN KEY (`symptom_id`) REFERENCES `symptoms`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `diary_symptoms` DROP FOREIGN KEY `FK_19579ca0f886473d25ecbd84af9`");
        await queryRunner.query("ALTER TABLE `diary_symptoms` DROP FOREIGN KEY `FK_38e3f15b9640130bf3220616bab`");
        await queryRunner.query("ALTER TABLE `diaries` DROP FOREIGN KEY `FK_648dd552daded36f58a30ca0932`");
        await queryRunner.query("ALTER TABLE `symptoms` DROP FOREIGN KEY `FK_2e71f3acf01760171725ec17bb3`");
        await queryRunner.query("DROP TABLE `diary_symptoms`");
        await queryRunner.query("DROP TABLE `diaries`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `symptoms`");
    }

}
