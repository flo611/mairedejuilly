/*
  Warnings:

  - Made the column `categorie` on table `file` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `file` MODIFY `categorie` VARCHAR(255) NOT NULL;
