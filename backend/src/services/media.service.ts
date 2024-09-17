import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { File } from 'multer'; // Importer le type 'File' depuis 'multer'

const prisma = new PrismaClient();

// Typage du paramètre 'file'
export const uploadFile = async (file: File) => {
  return prisma.file.create({
    data: {
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    },
  });
};

export const getFiles = async () => {
  return prisma.file.findMany();
};

export const getFileById = async (id: number) => {
  return prisma.file.findUnique({
    where: { id },
  });
};

export const deleteFile = async (id: number) => {
  const file = await prisma.file.findUnique({ where: { id } });
  if (file) {
    fs.unlinkSync(path.resolve(file.path)); // Supprime le fichier du système de fichiers
    return prisma.file.delete({
      where: { id },
    });
  }
};
