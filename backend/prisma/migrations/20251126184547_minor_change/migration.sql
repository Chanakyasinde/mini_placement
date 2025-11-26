/*
  Warnings:

  - The primary key for the `jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `companyName` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `job_title` on the `jobs` table. All the data in the column will be lost.
  - The primary key for the `skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_id` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the column `skill_name` on the `skills` table. All the data in the column will be lost.
  - You are about to drop the `_jobsToskills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[skillName]` on the table `skills` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillId` to the `skills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillName` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_jobsToskills` DROP FOREIGN KEY `_jobsToskills_A_fkey`;

-- DropForeignKey
ALTER TABLE `_jobsToskills` DROP FOREIGN KEY `_jobsToskills_B_fkey`;

-- DropForeignKey
ALTER TABLE `jobs` DROP FOREIGN KEY `jobs_companyName_fkey`;

-- DropIndex
DROP INDEX `skills_skill_name_key` ON `skills`;

-- AlterTable
ALTER TABLE `jobs` DROP PRIMARY KEY,
    DROP COLUMN `companyName`,
    DROP COLUMN `job_id`,
    DROP COLUMN `job_title`,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `jobId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `jobTitle` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`jobId`);

-- AlterTable
ALTER TABLE `skills` DROP PRIMARY KEY,
    DROP COLUMN `skill_id`,
    DROP COLUMN `skill_name`,
    ADD COLUMN `skillId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `skillName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`skillId`);

-- DropTable
DROP TABLE `_jobsToskills`;

-- CreateTable
CREATE TABLE `_JobSkills` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JobSkills_AB_unique`(`A`, `B`),
    INDEX `_JobSkills_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `skills_skillName_key` ON `skills`(`skillName`);

-- AddForeignKey
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobSkills` ADD CONSTRAINT `_JobSkills_A_fkey` FOREIGN KEY (`A`) REFERENCES `jobs`(`jobId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobSkills` ADD CONSTRAINT `_JobSkills_B_fkey` FOREIGN KEY (`B`) REFERENCES `skills`(`skillId`) ON DELETE CASCADE ON UPDATE CASCADE;
