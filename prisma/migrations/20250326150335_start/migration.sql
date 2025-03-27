-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_age_key" ON "User"("age");
