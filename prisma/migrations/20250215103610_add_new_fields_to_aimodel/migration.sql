/*
  Warnings:

  - Added the required column `category` to the `AIModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `AIModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `AIModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteUrl` to the `AIModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIModel" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "websiteUrl" TEXT NOT NULL;
