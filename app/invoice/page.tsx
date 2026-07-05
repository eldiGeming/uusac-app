import DashboardCard from "@/components/dashboard-card";
import InvoiceTable from "@/components/invoice/invoice-table";
import { Receipt, Wrench, Users } from "lucide-react";

export default function InvoicePage() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Invoice Management</h1>

          <p className="text-gray-500 mt-1">Daftar transaksi layanan AC Mobil</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        <DashboardCard title="Total Invoice" value={120} icon={Receipt} color="bg-blue-500" />

        <DashboardCard title="Sparepart" value={53} icon={Wrench} color="bg-green-500" />

        <DashboardCard title="Customer" value={89} icon={Users} color="bg-orange-500" />
      </div>

      <InvoiceTable />
    </>
  );
}
