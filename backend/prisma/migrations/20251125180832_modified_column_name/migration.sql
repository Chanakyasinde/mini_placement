/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `student_name` on the `Students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentName` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Students_phone_number_key` ON `Students`;

-- AlterTable
ALTER TABLE `Students` DROP COLUMN `phone_number`,
    DROP COLUMN `student_name`,
    ADD COLUMN `phoneNumber` BIGINT NOT NULL,
    ADD COLUMN `studentName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Students_phoneNumber_key` ON `Students`(`phoneNumber`);
