import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [totalBooks, totalOrders, pendingOrders, revenue, lowStockBooks] =
    await Promise.all([
      prisma.book.count(),

      prisma.order.count(),

      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: {
            not: "CANCELLED",
          },
        },
      }),

      prisma.book.count({
        where: {
          stock: {
            lte: 5,
          },
        },
      }),
    ]);

  const totalRevenue = revenue._sum.total ?? 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            📚 BookStore Admin
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-600 hover:text-blue-600"
          >
            ← Back to Store
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here is what's happening in your bookstore.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Books */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-3xl">📚</div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Books
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Total Books
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {totalBooks}
            </p>
          </div>

          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-3xl">📦</div>

              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                Orders
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Total Orders
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {totalOrders}
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-3xl">💰</div>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                Revenue
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Total Revenue
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Rs. {totalRevenue.toLocaleString()}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-3xl">⏳</div>

              <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                Pending
              </span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Pending Orders
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {pendingOrders}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Orders */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                📦
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Manage Orders
                </h2>

                <p className="text-sm text-slate-500">
                  View and update customer orders.
                </p>
              </div>
            </div>

            <Link
              href="/admin/orders"
              className="mt-6 block rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              View Orders
            </Link>
          </div>

          {/* Low Stock */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                ⚠️
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Low Stock
                </h2>

                <p className="text-sm text-slate-500">
                  Books with 5 or fewer copies remaining.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-red-50 px-5 py-4">
              <p className="text-2xl font-bold text-red-600">
                {lowStockBooks}
              </p>

              <p className="text-sm text-red-500">
                {lowStockBooks === 1
                  ? "book needs attention"
                  : "books need attention"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
          <h2 className="text-xl font-bold">
            Store Management
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/orders"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
            >
              📦 Orders
            </Link>

            <Link
              href="/admin/books"
              className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              📚 Store
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}