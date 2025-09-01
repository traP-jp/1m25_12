/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `links` on the `works` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `created_at`;

-- AlterTable
ALTER TABLE `works` DROP COLUMN `links`,
    DROP COLUMN `source`,
    MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `category` ENUM('PICTURE', 'MOVIE', 'SOUND', 'GAME', 'WEB_APP', 'OTHERS') NULL;
