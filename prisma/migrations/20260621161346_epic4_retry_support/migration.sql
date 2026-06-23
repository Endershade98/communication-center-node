-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `lastError` VARCHAR(191) NULL,
    ADD COLUMN `retryCount` INTEGER NOT NULL DEFAULT 0;
