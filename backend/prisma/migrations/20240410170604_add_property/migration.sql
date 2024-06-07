/*
  Warnings:

  - Added the required column `egg_size` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `egg_size` DOUBLE NOT NULL;
