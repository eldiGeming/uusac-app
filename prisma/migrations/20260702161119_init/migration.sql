/*
  Warnings:

  - You are about to drop the `detailInvoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "detailInvoice";

-- DropTable
DROP TABLE "invoice";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "tangglInvoice" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "namaPemilik" TEXT NOT NULL,
    "merkMobil" TEXT NOT NULL,
    "platMobil" TEXT NOT NULL,
    "totalHargaService" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailInvoice" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "namaService" TEXT NOT NULL,
    "hargaService" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetailInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DetailInvoice_invoiceId_idx" ON "DetailInvoice"("invoiceId");

-- AddForeignKey
ALTER TABLE "DetailInvoice" ADD CONSTRAINT "DetailInvoice_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
