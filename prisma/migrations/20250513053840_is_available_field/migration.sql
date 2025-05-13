/*
  Warnings:

  - You are about to drop the column `available` on the `BikeRental` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BikeRental_isApproved_rentPerHour_available_rating_idx";

-- AlterTable
ALTER TABLE "BikeRental" DROP COLUMN "available",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "BikeRental_isApproved_rentPerHour_isAvailable_rating_idx" ON "BikeRental"("isApproved", "rentPerHour", "isAvailable", "rating");
