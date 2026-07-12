"use client";

import { Eye, Pencil, Trash2, Printer, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getInvoices, createInvoice, updateInvoice, deleteInvoice, getInvoice } from "@/services/invoice.service";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import InvoiceModal from "./invoice-modal";
import { Input } from "@/components/ui/input";

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<"create" | "edit" | "detail">("create");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    totalData: 0,
    totalPage: 1,
    currentPage: 1,
    limit: 10,
  });
  const [data, setData] = useState([]);

  const fetchInvoice = useCallback(async () => {
    try {
      const res = await getInvoices({
        search,
        page,
        limit,
      });

      setInvoices(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

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
        <div className="flex items-center justify-between border-b p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input placeholder="Cari invoice..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>

          <button onClick={handleCreate} className="ml-4 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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

        <div className="flex flex-col gap-4 border-t p-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium">{(pagination.currentPage - 1) * pagination.limit + 1}</span>
            {" - "}
            <span className="font-medium">{Math.min(pagination.currentPage * pagination.limit, pagination.totalData)}</span> dari <span className="font-medium">{pagination.totalData}</span> data
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50">
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: pagination.totalPage }, (_, i) => i + 1)
              .filter((p) => {
                if (pagination.totalPage <= 5) return true;

                return p === 1 || p === pagination.totalPage || Math.abs(p - page) <= 1;
              })
              .map((p, index, arr) => (
                <div key={p} className="flex items-center">
                  {index > 0 && arr[index] - arr[index - 1] > 1 && <span className="px-2 text-gray-400">...</span>}

                  <button onClick={() => setPage(p)} className={`h-9 w-9 rounded-md transition ${page === p ? "bg-blue-600 text-white" : "border hover:bg-slate-100"}`}>
                    {p}
                  </button>
                </div>
              ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPage))}
              disabled={page === pagination.totalPage}
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
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
