/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_mobile_no]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `university_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_avtar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_age_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "name",
ADD COLUMN     "university_id" INTEGER NOT NULL,
ADD COLUMN     "user_avtar" TEXT NOT NULL,
ADD COLUMN     "user_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_mobile_no" BIGINT,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_password" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "University" (
    "university_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "cordinates" TEXT NOT NULL,
    "university_logo" TEXT NOT NULL,
    "user_count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "University_pkey" PRIMARY KEY ("university_id")
);

-- CreateTable
CREATE TABLE "Products" (
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "university_id" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Services" (
    "service_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "university_id" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "Purchases" (
    "purchase_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "university_id" INTEGER NOT NULL,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchase_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_mobile_no_key" ON "User"("user_mobile_no");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("university_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("university_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("university_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "University"("university_id") ON DELETE RESTRICT ON UPDATE CASCADE;
