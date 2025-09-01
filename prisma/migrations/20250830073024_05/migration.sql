/*
  Warnings:

  - You are about to drop the `channels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channel_id` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `channels` DROP FOREIGN KEY `channels_owner_id_fkey`;

-- AlterTable
ALTER TABLE `works` ADD COLUMN `channel_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `channels`;

-- CreateTable
CREATE TABLE `Channel` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserChannel` (
    `owner_id` VARCHAR(191) NOT NULL,
    `channel_id` VARCHAR(191) NOT NULL,
    `allowReviews` BOOLEAN NOT NULL DEFAULT false,
    `nsfw` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`channel_id`, `owner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserChannel` ADD CONSTRAINT `UserChannel_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChannel` ADD CONSTRAINT `UserChannel_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `works` ADD CONSTRAINT `works_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
