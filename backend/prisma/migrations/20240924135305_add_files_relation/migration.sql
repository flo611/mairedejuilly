-- AlterTable
ALTER TABLE `file` ADD COLUMN `articleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `File` ADD CONSTRAINT `File_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
