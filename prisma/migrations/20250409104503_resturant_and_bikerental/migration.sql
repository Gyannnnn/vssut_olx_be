/*
  Warnings:

  - Changed the type of `serviceType` on the `Services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('PROJECT_HELP', 'ASSIGNMENT_HELP', 'BIKE_RENTAL', 'TAXI_BOOKING', 'RESTURANT');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "ServiceType" NOT NULL;

-- CreateTable
CREATE TABLE "BikeRetal" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bikeRentalName" TEXT NOT NULL,
    "bikeRentalDescription" TEXT NOT NULL,
    "bikeRentalAddress" TEXT NOT NULL,
    "rentPerHour" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "idApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" DOUBLE PRECISION DEFAULT 0,
    "bikeRentalBanner" TEXT,

    CONSTRAINT "BikeRetal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeRetalProducts" (
    "id" TEXT NOT NULL,
    "rentalServiceId" TEXT NOT NULL,
    "bikeName" TEXT NOT NULL,
    "bikeDetails" TEXT NOT NULL,
    "bikeNumberPlate" TEXT NOT NULL,
    "anyNoteForRiders" TEXT,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "bikeImage" TEXT NOT NULL,
    "bikeImage2" TEXT,
    "bikeImage3" TEXT,
    "bikeImage4" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "isAvailble" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "BikeRetalProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BikeRentalReviews" (
    "reviewId" TEXT NOT NULL,
    "rentalServiceId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "disLikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BikeRentalReviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Resturant" (
    "resturantId" TEXT NOT NULL,
    "resturantsName" TEXT NOT NULL,
    "resturantDetails" TEXT NOT NULL,
    "resturantAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ServiceTime" TIMESTAMP(3) NOT NULL,
    "homeDeliveryService" BOOLEAN NOT NULL DEFAULT true,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "menu" TEXT,
    "menuImage" TEXT,
    "resturantBanner" TEXT,
    "rating" DOUBLE PRECISION DEFAULT 0,

    CONSTRAINT "Resturant_pkey" PRIMARY KEY ("resturantId")
);

-- CreateTable
CREATE TABLE "ResturantProducts" (
    "productId" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "foodDescription" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "foodPrice" DOUBLE PRECISION NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "foodImage" TEXT NOT NULL,
    "foodImage2" TEXT,
    "foodImage3" TEXT,

    CONSTRAINT "ResturantProducts_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ResturantReviews" (
    "reviewId" TEXT NOT NULL,
    "resturantId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ResturantReviews_pkey" PRIMARY KEY ("reviewId")
);

-- AddForeignKey
ALTER TABLE "BikeRetal" ADD CONSTRAINT "BikeRetal_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("service_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRetalProducts" ADD CONSTRAINT "BikeRetalProducts_rentalServiceId_fkey" FOREIGN KEY ("rentalServiceId") REFERENCES "BikeRetal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BikeRentalReviews" ADD CONSTRAINT "BikeRentalReviews_rentalServiceId_fkey" FOREIGN KEY ("rentalServiceId") REFERENCES "BikeRetal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResturantProducts" ADD CONSTRAINT "ResturantProducts_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("resturantId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResturantReviews" ADD CONSTRAINT "ResturantReviews_resturantId_fkey" FOREIGN KEY ("resturantId") REFERENCES "Resturant"("resturantId") ON DELETE RESTRICT ON UPDATE CASCADE;
