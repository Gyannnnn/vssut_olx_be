/*
  Warnings:

  - You are about to drop the column `adminId` on the `University` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminEmail]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminMobileNo]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminPassword` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "University" DROP CONSTRAINT "University_adminId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_university_id_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "adminPassword" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "University" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "university_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_admin_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminEmail_key" ON "Admin"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminMobileNo_key" ON "Admin"("adminMobileNo");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("university_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("admin_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "University"("university_id") ON DELETE CASCADE ON UPDATE CASCADE;
