/*
  Warnings:

  - You are about to drop the column `adminId` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the `Admins` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `stipend` on table `jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `companies` DROP FOREIGN KEY `companies_adminId_fkey`;

-- AlterTable
ALTER TABLE `companies` DROP COLUMN `adminId`;

-- AlterTable
ALTER TABLE `jobs` MODIFY `stipend` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Admins`;
