-- CreateTable
CREATE TABLE `_user_likes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_user_likes_AB_unique`(`A`, `B`),
    INDEX `_user_likes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_user_likes` ADD CONSTRAINT `_user_likes_A_fkey` FOREIGN KEY (`A`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_user_likes` ADD CONSTRAINT `_user_likes_B_fkey` FOREIGN KEY (`B`) REFERENCES `works`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
