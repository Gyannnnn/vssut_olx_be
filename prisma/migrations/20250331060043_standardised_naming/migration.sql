/*
  Warnings:

  - You are about to drop the column `delivery_date` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_date` on the `Purchases` table. All the data in the column will be lost.
  - You are about to drop the column `service_type` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_date` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `university_logo` on the `University` table. All the data in the column will be lost.
  - You are about to drop the column `user_count` on the `University` table. All the data in the column will be lost.
  - You are about to drop the column `hashed_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_avtar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_mobile_no` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userMobileNo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serviceType` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityLogo` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAvtar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_user_email_key";

-- DropIndex
DROP INDEX "User_user_mobile_no_key";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "delivery_date",
ADD COLUMN     "deliveryDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Purchases" DROP COLUMN "purchase_date",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "service_type",
ADD COLUMN     "serviceType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "payment_method",
DROP COLUMN "transaction_date",
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "University" DROP COLUMN "university_logo",
DROP COLUMN "user_count",
ADD COLUMN     "universityLogo" TEXT NOT NULL,
ADD COLUMN     "userCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashed_password",
DROP COLUMN "user_avtar",
DROP COLUMN "user_createdAt",
DROP COLUMN "user_email",
DROP COLUMN "user_mobile_no",
DROP COLUMN "user_name",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "userAvtar" TEXT NOT NULL,
ADD COLUMN     "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userMobileNo" TEXT,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_userMobileNo_key" ON "User"("userMobileNo");
