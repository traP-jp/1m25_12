/*
  Warnings:

  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChannel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_work_mappings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author_id` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserChannel` DROP FOREIGN KEY `UserChannel_channel_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserChannel` DROP FOREIGN KEY `UserChannel_owner_id_fkey`;

-- DropForeignKey
ALTER TABLE `_user_work_mappings` DROP FOREIGN KEY `_user_work_mappings_A_fkey`;

-- DropForeignKey
ALTER TABLE `_user_work_mappings` DROP FOREIGN KEY `_user_work_mappings_B_fkey`;

-- DropForeignKey
ALTER TABLE `works` DROP FOREIGN KEY `works_channel_id_fkey`;

-- DropIndex
DROP INDEX `works_channel_id_fkey` ON `works`;

-- AlterTable
ALTER TABLE `works` ADD COLUMN `author_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Channel`;

-- DropTable
DROP TABLE `UserChannel`;

-- DropTable
DROP TABLE `_user_work_mappings`;

-- CreateTable
CREATE TABLE `channels` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_channels` (
    `owner_id` VARCHAR(191) NOT NULL,
    `channel_id` VARCHAR(191) NOT NULL,
    `allowReviews` BOOLEAN NOT NULL DEFAULT false,
    `nsfw` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`channel_id`, `owner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_channels` ADD CONSTRAINT `user_channels_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_channels` ADD CONSTRAINT `user_channels_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `channels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
