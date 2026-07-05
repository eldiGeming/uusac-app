import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        details: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        {
          success: false,
          message: "Invoice not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get invoice",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const body = await request.json();

    await prisma.detailInvoice.deleteMany({
      where: {
        invoiceId: Number(id),
      },
    });

    const invoice = await prisma.invoice.update({
      where: {
        id: Number(id),
      },
      data: {
        tangglInvoice: new Date(body.tangglInvoice),
        namaPemilik: body.namaPemilik,
        phone: body.phone,
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
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update invoice",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    await prisma.invoice.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete invoice",
        error,
      },
      {
        status: 500,
      }
    );
  }
}