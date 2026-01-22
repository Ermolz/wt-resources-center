-- CreateEnum
CREATE TYPE "Manufacturer" AS ENUM ('NVIDIA', 'AMD', 'Intel');

-- CreateEnum
CREATE TYPE "GpuStatus" AS ENUM ('AVAILABLE', 'DISCONTINUED', 'COMING_SOON');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "confirmationToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chipsets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" "Manufacturer" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chipsets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chipsetId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "memoryGB" INTEGER NOT NULL,
    "memoryType" TEXT NOT NULL,
    "tdp" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "GpuStatus" NOT NULL DEFAULT 'AVAILABLE',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gpus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GpuToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_confirmationToken_key" ON "users"("confirmationToken");

-- CreateIndex
CREATE UNIQUE INDEX "chipsets_name_manufacturer_key" ON "chipsets"("name", "manufacturer");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_name_key" ON "vendors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_GpuToTag_AB_unique" ON "_GpuToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GpuToTag_B_index" ON "_GpuToTag"("B");

-- AddForeignKey
ALTER TABLE "gpus" ADD CONSTRAINT "gpus_chipsetId_fkey" FOREIGN KEY ("chipsetId") REFERENCES "chipsets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gpus" ADD CONSTRAINT "gpus_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GpuToTag" ADD CONSTRAINT "_GpuToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "gpus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GpuToTag" ADD CONSTRAINT "_GpuToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
