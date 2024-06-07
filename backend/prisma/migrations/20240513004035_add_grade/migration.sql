/*
  Warnings:

  - You are about to drop the column `egg_size` on the `activity` table. All the data in the column will be lost.
  - The values [fertil,nonfertil] on the enum `activity_egg_inside` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `egg_length` to the `activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `egg_width` to the `activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` DROP COLUMN `egg_size`,
    ADD COLUMN `egg_length` DOUBLE NOT NULL,
    ADD COLUMN `egg_width` DOUBLE NOT NULL,
    ADD COLUMN `grade` VARCHAR(5) NOT NULL,
    MODIFY `egg_inside` ENUM('fertile', 'nonfertile') NOT NULL;
