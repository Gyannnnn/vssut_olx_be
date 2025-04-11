/*
  Warnings:

  - Changed the type of `category` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCatagory" AS ENUM ('BOOK', 'ELECTRONICS', 'EQUIPMENTS', 'GADGETS');

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCatagory" NOT NULL;
