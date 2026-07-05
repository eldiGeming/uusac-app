"use client";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createInvoice, updateInvoice, getInvoice } from "@/services/invoice.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar, Car, ClipboardList, Plus, Save, Trash2 } from "lucide-react";

type Service = {
  service: string;
  price: number;
};

type InvoiceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit" | "detail";
  invoice?: any;
  onSuccess: () => void;
};

export default function InvoiceModal({ open, onOpenChange, mode, invoice, onSuccess }: InvoiceModalProps) {
  const [tanggalInvoice, setTanggalInvoice] = useState("");
  const [merkMobil, setMerkMobil] = useState("");
  const [platMobil, setPlatMobil] = useState("");
  const [services, setServices] = useState<Service[]>([
    {
      service: "",
      price: 0,
    },
  ]);

  useEffect(() => {
    if (!open) return;

    if (mode === "create") {
      setTanggalInvoice("");
      setMerkMobil("");
      setPlatMobil("");

      setServices([
        {
          service: "",
          price: 0,
        },
      ]);

      return;
    }

    if (!invoice) return;

    setTanggalInvoice(invoice.tangglInvoice ? new Date(invoice.tangglInvoice).toISOString().split("T")[0] : "");

    setMerkMobil(invoice.merkMobil ?? "");
    setPlatMobil(invoice.platMobil ?? "");

    setServices(
      (invoice.details ?? []).map((item: any) => ({
        service: item.namaService,
        price: item.hargaService,
      })),
    );
  }, [open, invoice, mode]);

  const total = services.reduce((a, b) => a + Number(b.price), 0);

  const handleSave = async () => {
    try {
      const body = {
        tangglInvoice: tanggalInvoice,
        merkMobil,
        platMobil,
        totalHargaService: total,
        details: services.map((item) => ({
          namaService: item.service,
          hargaService: item.price,
        })),
      };

      if (mode === "create") {
        await createInvoice(body);
        alert("Invoice berhasil dibuat");
      }

      if (mode === "edit") {
        await updateInvoice(invoice.id, body);
        alert("Invoice berhasil diupdate");
      }

      onSuccess();

      onOpenChange(false);
    } catch (err) {
      console.log(err);
      alert("Gagal menyimpan invoice");
    }
  };

  const addService = () => {
    setServices([
      ...services,
      {
        service: "",
        price: 0,
      },
    ]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = <K extends keyof Service>(index: number, field: K, value: Service[K]) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const formatRupiah = (value: number | string) => {
    if (!value) return "";

    return new Intl.NumberFormat("id-ID").format(Number(value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] !max-w-[1400px] max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" && "Tambah Invoice"}
            {mode === "edit" && "Ubah Invoice"}
            {mode === "detail" && "Detail Invoice"}
          </DialogTitle>
        </DialogHeader>
        {/* INFORMASI KENDARAAN */}
        <div className="bg-slate-50 rounded-xl p-4 border">
          <div className="flex items-center gap-2 mb-5">
            <Car size={18} />

            <h2 className="font-semibold">Informasi Kendaraan</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Tanggal Invoice</Label>

              <div className="relative mt-2">
                <Calendar size={16} className="absolute left-3 top-3 text-gray-400" />

                <Input type="date" className="pl-10" value={tanggalInvoice} onChange={(e) => setTanggalInvoice(e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Merk Mobil</Label>
              <div className="relative mt-2">
                <Input value={merkMobil} onChange={(e) => setMerkMobil(e.target.value)} placeholder="Masukkan merk mobil" />{" "}
              </div>
            </div>

            <div>
              <Label>Plat Nomor</Label>
              <div className="relative mt-2">
                <Input value={platMobil} onChange={(e) => setPlatMobil(e.target.value)} placeholder="Masukkan Plat nomor Mobil" />{" "}
              </div>
            </div>
          </div>
        </div>
        {/* DETAIL SERVICE */}
        <div className="bg-slate-50 rounded-xl p-4 border mt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ClipboardList size={18} />

              <h2 className="font-semibold">Detail Service</h2>
            </div>
            <Button onClick={addService} className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Plus size={16} />
              Tambah Service
            </Button>
          </div>

          <div className="space-y-4 mt-6">
            {services.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-8">
                  <Label>Nama Service</Label>

                  <Input value={item.service} onChange={(e) => updateService(index, "service", e.target.value)} placeholder="Masukkan nama service. cth: Isi freon" />
                </div>

                <div className="col-span-3">
                  <Label>Harga</Label>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>

                    <Input
                      type="text"
                      className="pl-10"
                      value={formatRupiah(item.price)}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        updateService(index, "price", Number(value));
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <Button size="icon" variant="ghost" onClick={() => removeService(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between bg-blue-100 rounded-xl p-5">
              <div>
                <p className="text-sm text-gray-500">TOTAL BIAYA SERVICE</p>
              </div>

              <h2 className="text-3xl font-bold text-blue-600">Rp {total.toLocaleString("id-ID")}</h2>
            </div>
          </div>
        </div>
        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all">
            <Save size={16} className="mr-2" />
            Simpan Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
