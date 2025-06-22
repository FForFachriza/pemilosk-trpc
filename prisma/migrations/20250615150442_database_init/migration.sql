/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nis]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GURU', 'MURID', 'OSIS', 'MPK', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "kandidatMpkId" TEXT,
ADD COLUMN     "nis" TEXT,
ADD COLUMN     "osisChoiceid" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "role" "Role",
ADD COLUMN     "selectedMpk" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "selectedOsis" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "KandidatOsis" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "slogan" TEXT,
    "proker" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KandidatOsis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KandidatMpk" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "slogan" TEXT,
    "proker" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KandidatMpk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KandidatOsis_nama_key" ON "KandidatOsis"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "KandidatMpk_nama_key" ON "KandidatMpk"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "User_nis_key" ON "User"("nis");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_osisChoiceid_fkey" FOREIGN KEY ("osisChoiceid") REFERENCES "KandidatOsis"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_kandidatMpkId_fkey" FOREIGN KEY ("kandidatMpkId") REFERENCES "KandidatMpk"("id") ON DELETE SET NULL ON UPDATE CASCADE;
