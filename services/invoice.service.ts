export const getInvoices = async () => {
  const res = await fetch("/api/invoice");

  if (!res.ok) {
    throw new Error("Failed to fetch invoice");
  }

  return res.json();
};

export const getInvoice = async (id: number) => {
  const res = await fetch(`/api/invoice/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch invoice");
  }

  return res.json();
};

export const createInvoice = async (body: any) => {
  const res = await fetch("/api/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const updateInvoice = async (
  id: number,
  body: any
) => {
  const res = await fetch(`/api/invoice/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const deleteInvoice = async (id: number) => {
  const res = await fetch(`/api/invoice/${id}`, {
    method: "DELETE",
  });

  return res.json();
};