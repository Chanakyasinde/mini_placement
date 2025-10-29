-- CreateTable
CREATE TABLE `Students` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_name` VARCHAR(191) NOT NULL,
    `phone_number` BIGINT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `resume_link` VARCHAR(191) NOT NULL,
    `year_passed_out` VARCHAR(191) NULL,
    `cgpa` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Students_phone_number_key`(`phone_number`),
    UNIQUE INDEX `Students_email_key`(`email`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
