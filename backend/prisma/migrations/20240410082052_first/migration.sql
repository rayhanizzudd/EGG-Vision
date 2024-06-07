-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'pegawai') NOT NULL,
    `status` TEXT NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activity` (
    `id_activity` INTEGER NOT NULL AUTO_INCREMENT,
    `date_log` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `egg_inside` ENUM('fertil', 'nonfertil') NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_activity`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `activity` ADD CONSTRAINT `activity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
