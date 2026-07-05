"use client";

import { Eye, Pencil, Trash2, Printer } from "lucide-react";
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getInvoice } from "@/services/invoice.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InvoiceModal from "./invoice-modal";

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "detail">("create");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const res = await getInvoices();

      setInvoices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    try {
      setSelectedInvoice(null);
      setMode("create");
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDetail = async (id: number) => {
    try {
      const res = await getInvoice(id);

      setSelectedInvoice(res.data);

      setMode("detail");
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const res = await getInvoice(id);

      setSelectedInvoice(res.data);
      setMode("edit");
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Apakah yakin ingin menghapus invoice ini?");

    if (!confirmDelete) return;

    try {
      await deleteInvoice(id);
      setInvoices((prev) => prev.filter((item) => item.id !== id));
      alert("Invoice berhasil dihapus");

      router.refresh();
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus invoice");
    }
  };

  const handlePrint = (id: number) => {
    console.log("Print", id);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
        {/* Header */}
        <div className="flex justify-end p-4 border-b">
          <button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + Buat Invoice
          </button>
        </div>

        {/* ================= Desktop ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 text-gray-600">
              <tr>
                <th className="text-left p-4">Tanggal</th>
                <th className="text-left">Merk</th>
                <th className="text-left">Plat</th>
                <th className="text-left">Total</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">{new Date(item.tangglInvoice).toLocaleDateString("id-ID")}</td>

                  <td>{item.merkMobil}</td>

                  <td>{item.platMobil}</td>

                  <td className="font-semibold text-blue-600">Rp {item.totalHargaService.toLocaleString("id-ID")}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleDetail(item.id)}>
                        <Eye size={18} className="text-blue-600" />
                      </button>

                      <button onClick={() => handleEdit(item.id)}>
                        <Pencil size={18} className="text-yellow-600" />
                      </button>

                      <button>
                        <Printer size={18} className="text-green-600" />
                      </button>

                      <button onClick={() => handleDelete(item.id)}>
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= Mobile ================= */}
        <div className="md:hidden p-4 space-y-4">
          {invoices.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Tanggal</span>
                <span>{new Date(item.tangglInvoice).toLocaleDateString("id-ID")}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">Mobil</span>
                <span>{item.merkMobil}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">Plat</span>
                <span>{item.platMobil}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-sm">Total</span>
                <span className="font-semibold text-blue-600">Rp {item.totalHargaService.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-end gap-2 mt-4 border-t pt-3">
                <button onClick={() => handleDetail(item.id)}>
                  <Eye size={18} className="text-blue-600" />
                </button>

                <button onClick={() => handleEdit(item.id)}>
                  <Pencil size={18} className="text-yellow-600" />
                </button>

                <button>
                  <Printer size={18} className="text-green-600" />
                </button>

                <button onClick={() => handleDelete(item.id)}>
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <InvoiceModal
        open={openModal}
        onOpenChange={setOpenModal}
        mode={mode}
        invoice={selectedInvoice}
        onSuccess={() => {
          fetchInvoice();
          setOpenModal(false);
        }}
      />
    </>
  );
}
