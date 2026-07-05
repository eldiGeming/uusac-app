import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        details: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get invoices",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const invoice = await prisma.invoice.create({
      data: {
        tangglInvoice: new Date(body.tangglInvoice),
        merkMobil: body.merkMobil,
        platMobil: body.platMobil,
        totalHargaService: body.totalHargaService,

        details: {
          create: body.details.map(
            (item: {
              namaService: string;
              hargaService: number;
            }) => ({
              namaService: item.namaService,
              hargaService: item.hargaService,
            })
          ),
        },
      },
      include: {
        details: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
  console.error("POST /api/invoice ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: "Failed to create invoice",
      error: error instanceof Error ? error.message : String(error),
    },
    {
      status: 500,
    }
  );
}
}