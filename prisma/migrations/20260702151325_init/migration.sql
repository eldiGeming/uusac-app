-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "tangglInvoice" TIMESTAMP(3) NOT NULL,
    "phone" TEXT,
    "namaPemilik" TEXT NOT NULL,
    "merkMobil" TEXT NOT NULL,
    "platMobil" TEXT NOT NULL,
    "totalHargaService" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detailInvoice" (
    "id" SERIAL NOT NULL,
    "namaService" TEXT NOT NULL,
    "hargaService" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detailInvoice_pkey" PRIMARY KEY ("id")
);
