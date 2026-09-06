"use client";

import { useState } from "react";

type Props = {
  orderId: number;
  currentStatus: string;
};

export default function StatusDropdown({
  orderId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    setLoading(true);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      setStatus(currentStatus);
      alert("Status update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
    >
      <option value="PENDING">PENDING</option>
      <option value="CONFIRMED">CONFIRMED</option>
      <option value="SHIPPED">SHIPPED</option>
      <option value="DELIVERED">DELIVERED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}