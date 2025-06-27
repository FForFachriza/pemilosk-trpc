/*
  Warnings:

  - The values [OSIS,MPK] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `KandidatMpk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KandidatOsis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_kandidatMpkId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_osisChoiceid_fkey";

-- DropTable
DROP TABLE "KandidatMpk";

-- DropTable
DROP TABLE "KandidatOsis";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nis" INTEGER,
    "password" TEXT,
    "role" "Role",
    "osisChoiceid" TEXT,
    "kandidatMpkId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "osis_candidates" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "slogan" TEXT,
    "proker" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pasanganOsisId" TEXT,
    "periodeId" TEXT,

    CONSTRAINT "osis_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mpk_candidates" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "slogan" TEXT,
    "proker" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pasanganMpkId" TEXT,
    "periodeId" TEXT,

    CONSTRAINT "mpk_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "osis_partners" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "osis_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mpk_partners" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mpk_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL,
    "ended_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voting_chances" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "periode_id" TEXT NOT NULL,
    "kelas" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL DEFAULT 1,
    "osis_voted" BOOLEAN NOT NULL DEFAULT false,
    "mpk_voted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voting_chances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nis_key" ON "users"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "osis_candidates_nama_key" ON "osis_candidates"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "osis_candidates_pasanganOsisId_key" ON "osis_candidates"("pasanganOsisId");

-- CreateIndex
CREATE UNIQUE INDEX "mpk_candidates_nama_key" ON "mpk_candidates"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "mpk_candidates_pasanganMpkId_key" ON "mpk_candidates"("pasanganMpkId");

-- CreateIndex
CREATE UNIQUE INDEX "osis_partners_nama_key" ON "osis_partners"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "mpk_partners_nama_key" ON "mpk_partners"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "periods_nama_key" ON "periods"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "voting_chances_user_id_periode_id_key" ON "voting_chances"("user_id", "periode_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_osisChoiceid_fkey" FOREIGN KEY ("osisChoiceid") REFERENCES "osis_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_kandidatMpkId_fkey" FOREIGN KEY ("kandidatMpkId") REFERENCES "mpk_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "osis_candidates" ADD CONSTRAINT "osis_candidates_pasanganOsisId_fkey" FOREIGN KEY ("pasanganOsisId") REFERENCES "osis_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "osis_candidates" ADD CONSTRAINT "osis_candidates_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mpk_candidates" ADD CONSTRAINT "mpk_candidates_pasanganMpkId_fkey" FOREIGN KEY ("pasanganMpkId") REFERENCES "mpk_partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mpk_candidates" ADD CONSTRAINT "mpk_candidates_periodeId_fkey" FOREIGN KEY ("periodeId") REFERENCES "periods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting_chances" ADD CONSTRAINT "voting_chances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting_chances" ADD CONSTRAINT "voting_chances_periode_id_fkey" FOREIGN KEY ("periode_id") REFERENCES "periods"("id") ON DELETE CASCADE ON UPDATE CASCADE;
