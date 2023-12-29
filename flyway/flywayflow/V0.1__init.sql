CREATE DATABASE IF NOT EXISTS `tsoa_express` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tsoa_express`;

CREATE TABLE `users` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`phone_num` VARCHAR(32) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`username` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`verified_at` TIMESTAMP NULL DEFAULT NULL,
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`login_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	`status` INT(10) NULL DEFAULT '1',
	`created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `username_unique` (`username`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=10000000
;

INSERT INTO `tsoa_express`.`users` (`username`, `password`) VALUES ('test', '$2b$10$O/.nS0P1MIEpC72C2VqEJuAcV4eZxCnF14V/2Ei4EKL50UREzO6Wm');