/*
  Warnings:

  - The values [BUYER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SuperAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('STUDENT', 'STUDENT_SELLER', 'SELLER', 'ADMIN', 'SUPERADMIN');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
COMMIT;

-- DropForeignKey
ALTER TABLE "_admin" DROP CONSTRAINT "_admin_A_fkey";

-- DropForeignKey
ALTER TABLE "_admin" DROP CONSTRAINT "_admin_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "SuperAdmin";

-- DropTable
DROP TABLE "_admin";
