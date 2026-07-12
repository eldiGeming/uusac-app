import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") || "";
    const page = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit = Number(request.nextUrl.searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const where = {
      ...(search && {
        OR: [
          {
            merkMobil: {
              contains: search,
            },
          },
          {
            platMobil: {
              contains: search,
            },
          },
          {
            phone: {
              contains: search,
            },
          },
        ],
      }),
    };

    const [totalData, invoices] = await Promise.all([
      prisma.invoice.count({
        where,
      }),
      prisma.invoice.findMany({
        where,
        include: {
          details: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: invoices,
      pagination: {
        totalData,
        totalPage: Math.ceil(totalData / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);

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