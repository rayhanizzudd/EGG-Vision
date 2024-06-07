-- CreateTable
CREATE TABLE `Calibration` (
    `id_calibration` INTEGER NOT NULL AUTO_INCREMENT,
    `length` DOUBLE NOT NULL,
    `width` DOUBLE NOT NULL,
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Calibration_id_user_key`(`id_user`),
    PRIMARY KEY (`id_calibration`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Calibration` ADD CONSTRAINT `Calibration_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
