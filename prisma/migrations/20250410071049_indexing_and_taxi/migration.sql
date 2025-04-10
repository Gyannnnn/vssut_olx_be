/*
  Warnings:

  - The values [RESTURANT] on the enum `ServiceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `BikeRetal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resturant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResturantProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResturantReviews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userName` to the `BikeRentalReviews` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `condition` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCondition" AS ENUM ('NEW', 'USED');

-- AlterEnum
BEGIN;
CREATE TYPE "ServiceType_new" AS ENUM ('PROJECT_HELP', 'ASSIGNMENT_HELP', 'BIKE_RENTAL', 'TAXI_BOOKING', 'RESTAURANT');
ALTER TABLE "Services" ALTER COLUMN "serviceType" TYPE "ServiceType_new" USING ("serviceType"::text::"ServiceType_new");
ALTER TYPE "ServiceType" RENAME TO "ServiceType_old";
ALTER TYPE "ServiceType_new" RENAME TO "ServiceType";
DROP TYPE "ServiceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "BikeRentalReviews" DROP CONSTRAINT "BikeRentalReviews_rentalServiceId_fkey";

-- DropForeignKey
ALTER TABLE "BikeRetal" DROP CONSTRAINT "BikeRetal_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "BikeRetalProducts" DROP CONSTRAINT "BikeRetalProducts_rentalServiceId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantProducts" DROP CONSTRAINT "ResturantProducts_resturantId_fkey";

-- DropForeignKey
ALTER TABLE "ResturantReviews" DROP CONSTRAINT "ResturantReviews_resturantId_fkey";

-- AlterTable
ALTER TABLE "BikeRentalReviews" ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "condition",
ADD COLUMN     "condition" "ProductCondition" NOT NULL;

-- DropTable
DROP TABLE "BikeRetal";

-- DropTable
DROP TABLE "Resturant";

-- DropTable
DROP TABLE "ResturantProducts";

-- DropTable
DROP TABLE "ResturantReviews";

-- CreateTable
CREATE TABLE "BikeRental" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bikeRentalName" TEXT NOT NULL,
    "bikeRentalDescriptionn" TEXT NOT NULL,
    "bikeRentalAddress" TEXT NOT NULL,
    "rentPerHour" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "bikeRentalBanner" TEXT,

    CONSTRAINT "BikeRental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "restaurantId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "restaurantsName" TEXT NOT NULL,
    "restaurantDetails" TEXT NOT NULL,
    "restaurantAddress" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "serviceTime" TIMESTAMP(3) NOT NULL,
    "homeDeliveryService" BOOLEAN NOT NULL DEFAULT true,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "menu" TEXT,
    "menuImage" TEXT,
    "restaurantBanner" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("restaurantId")
);

-- CreateTable
CREATE TABLE "RestaurantProducts" (
    "productId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "foodDescription" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "foodPrice" DOUBLE PRECISION NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "foodImage" TEXT NOT NULL,
    "foodImage2" TEXT,
    "foodImage3" TEXT,

    CONSTRAINT "RestaurantProducts_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "RestaurantReviews" (
    "reviewId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "userName" TEXT NOT NULL,

    CONSTRAINT "RestaurantReviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "TaxiBooking" (
    "taxiBookingId" TEXT NOT NULL,
    "TaxiBookingName" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "taxiNumberPlate" TEXT NOT NULL,
    "taxiBookingDetails" TEXT,
    "taxiImage" TEXT,
    "driverMobileNo" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "TaxiBooking_pkey" PRIMARY KEY ("taxiBookingId")
);

-- CreateTable
CREATE TABLE "TaxibookingServices" (
    "id" TEXT NOT NULL,
    "taxiBookingId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "startingPoint" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "serviceDetails" TEXT NOT NULL,
    "fareAmount" DOUBLE PRECISION NOT NULL,
    "serviceTime" TEXT NOT NULL,

    CONSTRAINT "TaxibookingServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiBookingReviews" (
    "reviewId" TEXT NOT NULL,
    "taxiBookingId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "disLikes" INTEGER NOT NULL DEFAULT 0,
    "userName" TEXT NOT NULL,

    CONSTRAINT "TaxiBookingReviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateIndex
CREATE INDEX "BikeRental_isApproved_rentPerHour_available_rating_idx" ON "BikeRental"("isApproved", "rentPerHour", "available", "rating");

-- CreateIndex
CREATE INDEX "Restaurant_isOpen_homeDeliveryService_restaurantsName_ratin_idx" ON "Restaurant"("isOpen", "homeDeliveryService", "restaurantsName", "rating", "isApproved");

-- CreateIndex
CREATE INDEX "RestaurantProducts_foodPrice_likes_foodName_idx" ON "RestaurantProducts"("foodPrice", "likes", "foodName");

-- CreateIndex
CREATE INDEX "TaxiBooking_rating_idx" ON "TaxiBooking"("rating");

-- CreateIndex
CREATE INDEX "TaxibookingServices_fareAmount_destination_serviceTime_idx" ON "TaxibookingServices"("fareAmount", "destination", "serviceTime");

-- CreateIndex
CREATE INDEX "BikeRetalProducts_pricePerHour_bikeName_idx" ON "BikeRetalProducts"("pricePerHour", "bikeName");

-- AddForeignKey
ALTER TABLE "BikeRental" ADD CONSTRAINT "BikeRental_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRetalProducts" ADD CONSTRAINT "BikeRetalProducts_rentalServiceId_fkey" FOREIGN KEY ("rentalServiceId") REFERENCES "BikeRental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRentalReviews" ADD CONSTRAINT "BikeRentalReviews_rentalServiceId_fkey" FOREIGN KEY ("rentalServiceId") REFERENCES "BikeRental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantProducts" ADD CONSTRAINT "RestaurantProducts_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("restaurantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantReviews" ADD CONSTRAINT "RestaurantReviews_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("restaurantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxibookingServices" ADD CONSTRAINT "TaxibookingServices_taxiBookingId_fkey" FOREIGN KEY ("taxiBookingId") REFERENCES "TaxiBooking"("taxiBookingId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiBookingReviews" ADD CONSTRAINT "TaxiBookingReviews_taxiBookingId_fkey" FOREIGN KEY ("taxiBookingId") REFERENCES "TaxiBooking"("taxiBookingId") ON DELETE RESTRICT ON UPDATE CASCADE;
