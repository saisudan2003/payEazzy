/*
  Warnings:

  - You are about to drop the column `token` on the `OnRampTransaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "OnRampTransaction_token_key";

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "token";
