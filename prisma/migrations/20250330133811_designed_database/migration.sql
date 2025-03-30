/*
  Warnings:

  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Purchases` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `university_id` on the `Purchases` table. All the data in the column will be lost.
  - The primary key for the `Services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `University` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cordinates` on the `University` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_password` on the `User` table. All the data in the column will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_type` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Order_Status" AS ENUM ('PLACED', 'DISPATCHED', 'RECEIVED');

-- CreateEnum
CREATE TYPE "Transaction_Status" AS ENUM ('PAID', 'NOT_PAID');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SELLER', 'BUYER');

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_university_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_university_id_fkey";

-- DropForeignKey
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_university_id_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_university_id_fkey";

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "product_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "university_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id");

-- AlterTable
ALTER TABLE "Purchases" DROP CONSTRAINT "Purchases_pkey",
DROP COLUMN "university_id",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ADD COLUMN     "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "Order_Status" NOT NULL DEFAULT 'PLACED',
ALTER COLUMN "purchase_id" DROP DEFAULT,
ALTER COLUMN "purchase_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Purchases_pkey" PRIMARY KEY ("purchase_id");
DROP SEQUENCE "Purchases_purchase_id_seq";

-- AlterTable
ALTER TABLE "Services" DROP CONSTRAINT "Services_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "service_type" TEXT NOT NULL,
ALTER COLUMN "service_id" DROP DEFAULT,
ALTER COLUMN "service_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "university_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Services_pkey" PRIMARY KEY ("service_id");
DROP SEQUENCE "Services_service_id_seq";

-- AlterTable
ALTER TABLE "University" DROP CONSTRAINT "University_pkey",
DROP COLUMN "cordinates",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "university_id" DROP DEFAULT,
ALTER COLUMN "university_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_count" SET DEFAULT 0,
ADD CONSTRAINT "University_pkey" PRIMARY KEY ("university_id");
DROP SEQUENCE "University_university_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_password",
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BUYER',
ALTER COLUMN "university_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_mobile_no" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "order_id" TEXT NOT NULL,
    "status" "Order_Status" NOT NULL DEFAULT 'PLACED',
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DECIMAL(65,30) NOT NULL,
    "paymentStatus" "Transaction_Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivery_date" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "transaction_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "buyer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" "Transaction_Status" NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transaction_id")
);

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
ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
