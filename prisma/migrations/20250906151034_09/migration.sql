/*
  Warnings:

  - You are about to drop the column `parent_id` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `type` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_parent_id_fkey`;

-- DropIndex
DROP INDEX `reviews_parent_id_fkey` ON `reviews`;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `parent_id`,
    ADD COLUMN `type` ENUM('GOOD', 'MORE') NOT NULL;

-- CreateIndex
CREATE INDEX `reviews_author_id_work_id_idx` ON `reviews`(`author_id`, `work_id`);
