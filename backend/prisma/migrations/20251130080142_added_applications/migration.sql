-- AlterTable
ALTER TABLE `Students` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Applications` (
    `applicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `jobId` INTEGER NOT NULL,
    `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL DEFAULT 'Applied',

    UNIQUE INDEX `Applications_studentId_jobId_key`(`studentId`, `jobId`),
    PRIMARY KEY (`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Applications` ADD CONSTRAINT `Applications_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Applications` ADD CONSTRAINT `Applications_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`jobId`) ON DELETE RESTRICT ON UPDATE CASCADE;
