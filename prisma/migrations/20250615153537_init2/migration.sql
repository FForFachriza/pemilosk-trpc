/*
  Warnings:

  - The `nis` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nis",
ADD COLUMN     "nis" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_nis_key" ON "User"("nis");
