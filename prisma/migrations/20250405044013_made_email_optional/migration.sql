/*
  Warnings:

  - Made the column `userMobileNo` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_userEmail_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userAvtar" DROP NOT NULL,
ALTER COLUMN "userEmail" DROP NOT NULL,
ALTER COLUMN "userMobileNo" SET NOT NULL;
