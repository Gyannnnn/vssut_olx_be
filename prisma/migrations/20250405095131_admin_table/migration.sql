/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `adminId` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SELLER', 'BUYER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'BUYER';
COMMIT;

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "adminName" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "adminMobileNo" TEXT NOT NULL,
    "adminAddress" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("admin_id") ON DELETE RESTRICT ON UPDATE CASCADE;
