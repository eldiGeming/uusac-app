import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalInvoice, totalPendapatan, totalMobil] =
      await Promise.all([
        prisma.invoice.count(),

        prisma.invoice.aggregate({
          _sum: {
            totalHargaService: true,
          },
        }),

        prisma.invoice.groupBy({
          by: ["platMobil"],
        }),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        totalInvoice,
        totalPendapatan: totalPendapatan._sum.totalHargaService ?? 0,
        totalMobil: totalMobil.length,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get dashboard statistics",
      },
      {
        status: 500,
      }
    );
  }
}