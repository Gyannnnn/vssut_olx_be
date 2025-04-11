-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "imageUrl2" TEXT,
ADD COLUMN     "imageUrl3" TEXT,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ProductReviews" (
    "reviewId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "ProductReviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateIndex
CREATE INDEX "ProductReviews_productId_idx" ON "ProductReviews"("productId");

-- CreateIndex
CREATE INDEX "Products_user_id_product_id_category_price_rating_likes_con_idx" ON "Products"("user_id", "product_id", "category", "price", "rating", "likes", "condition");

-- CreateIndex
CREATE INDEX "Services_user_id_university_id_price_serviceType_idx" ON "Services"("user_id", "university_id", "price", "serviceType");

-- AddForeignKey
ALTER TABLE "ProductReviews" ADD CONSTRAINT "ProductReviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
