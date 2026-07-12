export const getInvoices = async ({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`/api/invoice?${params.toString()}`, {
    cache: "no-store",
  });

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

export const getDashboard = async () => {
  const res = await fetch("/api/dashboard", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};