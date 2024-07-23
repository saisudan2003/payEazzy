/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- AlterTable
-- ALTER TABLE "User" ADD COLUMN     "number" TEXT NOT NULL,
-- ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable to add columns with temporary default values
ALTER TABLE "User" 
ADD COLUMN "number" TEXT DEFAULT 'temporary_number',
ADD COLUMN "password" TEXT DEFAULT 'temporary_password';

-- Update the table to set actual values if needed
-- For example, update number and password for existing users
-- UPDATE "User" SET "number" = 'actual_number', "password" = 'actual_password' WHERE "id" = 1;

-- Drop the default values and enforce NOT NULL constraint
ALTER TABLE "User" ALTER COLUMN "number" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "number" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");
