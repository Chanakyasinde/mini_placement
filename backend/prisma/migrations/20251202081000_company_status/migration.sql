/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Admins` table. All the data in the column will be lost.
  - Added the required column `password` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admins` DROP COLUMN `createdAt`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `companies` ADD COLUMN `adminId` INTEGER NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `companies` ADD CONSTRAINT `companies_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admins`(`admin_id`) ON DELETE SET NULL ON UPDATE CASCADE;
