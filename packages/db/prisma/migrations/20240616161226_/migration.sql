-- CreateTable
CREATE TABLE "Bank_db" (
    "id" SERIAL NOT NULL,
    "MerchantCode" TEXT NOT NULL,
    "ClientCode" TEXT NOT NULL,
    "ClientTxnToken" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "DateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Checksumval" TEXT NOT NULL,

    CONSTRAINT "Bank_db_pkey" PRIMARY KEY ("id")
);
