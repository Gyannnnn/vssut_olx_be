-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "adminAvatar" TEXT;

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "superAdmin_id" TEXT NOT NULL,
    "superAdminName" TEXT NOT NULL,
    "superAdminEmail" TEXT NOT NULL,
    "superAdminPassword" TEXT NOT NULL,
    "superAdminMobileNo" TEXT NOT NULL,
    "superAdminAvatar" TEXT NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("superAdmin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_superAdminEmail_key" ON "SuperAdmin"("superAdminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_superAdminMobileNo_key" ON "SuperAdmin"("superAdminMobileNo");
