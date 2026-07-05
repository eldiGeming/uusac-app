"use client";

import Link from "next/link";
import { useState } from "react";
import { Receipt, Wrench, Menu, X } from "lucide-react";

const menus = [
  {
    name: "Transactions",
    href: "/invoice",
    icon: Receipt,
  },
  {
    name: "Sparepart",
    href: "/sparepart",
    icon: Wrench,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ================= Mobile Navbar ================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <div>
            <h1 className="font-bold text-slate-800">UUS SERVICE AC MOBIL</h1>

            <p className="text-xs text-slate-500">Workshop Management</p>
          </div>

          <button onClick={() => setIsOpen(true)} className="p-2 rounded-md hover:bg-slate-100">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= Mobile Drawer ================= */}
      <div className={`fixed inset-0 z-50 lg:hidden transition ${isOpen ? "visible" : "invisible"}`}>
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsOpen(false)} />

        {/* Drawer */}
        <aside className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h1 className="font-bold text-slate-800">UUS SERVICE AC MOBIL</h1>

              <p className="text-xs text-slate-500">Workshop Management</p>
            </div>

            <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
              <X size={20} />
            </button>
          </div>

          <nav className="p-3">
            {menus.map((menu) => (
              <Link key={menu.name} href={menu.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 mb-2 hover:bg-blue-600 hover:text-white transition">
                <menu.icon size={20} />

                <span className="text-sm font-medium">{menu.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden lg:flex w-64 h-screen bg-white border-r shadow-sm flex-col">
        <div className="p-4 border-b">
          <h1 className="font-bold text-slate-800">UUS SERVICE AC MOBIL</h1>

          <p className="text-xs text-slate-500">Workshop Management</p>
        </div>

        <nav className="p-3">
          {menus.map((menu) => (
            <Link key={menu.name} href={menu.href} className="flex items-center gap-3 rounded-lg px-3 py-3 mb-2 hover:bg-blue-600 hover:text-white transition">
              <menu.icon size={20} />

              <span className="text-sm font-medium">{menu.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
