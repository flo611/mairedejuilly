/*
  Warnings:

  - Added the required column `categorie` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `categorie` VARCHAR(255) NOT NULL;
