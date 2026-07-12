"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard-card";
import InvoiceTable from "@/components/invoice/invoice-table";
import { getDashboard } from "@/services/invoice.service";
import { Receipt, Users, Wrench } from "lucide-react";

export default function InvoicePage() {
  const [dashboard, setDashboard] = useState({
    totalInvoice: 0,
    totalPendapatan: 0,
    totalMobil: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>

          <p className="text-gray-500 mt-1">Daftar transaksi layanan AC Mobil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <DashboardCard title="Total Invoice" value={dashboard.totalInvoice} icon={Receipt} color="bg-blue-500" />

        <DashboardCard title="Total Pendapatan" value={`Rp ${dashboard.totalPendapatan.toLocaleString("id-ID")}`} icon={Wrench} color="bg-green-500" />

        <DashboardCard title="Total Mobil" value={dashboard.totalMobil} icon={Users} color="bg-orange-500" />
      </div>

      <InvoiceTable />
    </>
  );
}
