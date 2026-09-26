import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    totalBooks,
    totalOrders,
    pendingOrders,
    revenue,
    lowStockBooks,
    recentOrders,
  ] = await Promise.all([
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

    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const totalRevenue = revenue._sum.total ?? 0;

  return (
    <main className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl shadow-sm">
              📚
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">
                BookStore
              </p>

              <p className="text-xs font-medium text-slate-500">
                Admin Panel
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Store
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 p-8 shadow-lg md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Overview
              </p>

              <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Monitor your bookstore, manage orders and keep track of
                your inventory from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-blue-100">
                Store Revenue
              </p>

              <p className="mt-1 text-3xl font-bold text-white">
                Rs. {totalRevenue.toLocaleString()}
              </p>

              <p className="mt-1 text-xs text-blue-200">
                Excluding cancelled orders
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Books */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                📚
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Inventory
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Total Books
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {totalBooks}
            </p>

            <Link
              href="/admin/books"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage books →
            </Link>
          </div>

          {/* Orders */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                📦
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Orders
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Total Orders
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {totalOrders}
            </p>

            <Link
              href="/admin/orders"
              className="mt-4 inline-block text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              View orders →
            </Link>
          </div>

          {/* Revenue */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                💰
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Revenue
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Total Revenue
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Rs. {totalRevenue.toLocaleString()}
            </p>

            <p className="mt-4 text-sm text-emerald-600">
              ✓ Active sales
            </p>
          </div>

          {/* Pending */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">
                ⏳
              </div>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Attention
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Pending Orders
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {pendingOrders}
            </p>

            <Link
              href="/admin/orders"
              className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:text-amber-700"
            >
              Review orders →
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Recent Orders */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest customer orders
                </p>
              </div>

              <Link
                href="/admin/orders"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all →
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-4xl">📦</div>

                <p className="mt-3 font-semibold text-slate-700">
                  No orders yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Customer orders will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                        {order.customerName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {order.customerName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Order #{order.id}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        Rs. {order.total.toLocaleString()}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
                          order.status === "PENDING"
                            ? "bg-yellow-50 text-yellow-700"
                            : order.status === "CANCELLED"
                              ? "bg-red-50 text-red-700"
                              : "bg-green-50 text-green-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Common store management tasks
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/admin/books/new"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                  ➕
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Add New Book
                  </p>

                  <p className="text-sm text-slate-500">
                    Add a book to your store
                  </p>
                </div>

                <span className="ml-auto text-slate-400">
                  →
                </span>
              </Link>

              <Link
                href="/admin/books"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-purple-200 hover:bg-purple-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                  📚
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Manage Books
                  </p>

                  <p className="text-sm text-slate-500">
                    Edit or delete books
                  </p>
                </div>

                <span className="ml-auto text-slate-400">
                  →
                </span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                  📦
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Manage Orders
                  </p>

                  <p className="text-sm text-slate-500">
                    Update customer orders
                  </p>
                </div>

                <span className="ml-auto text-slate-400">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
                ⚠️
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Inventory Alert
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Books with 5 or fewer copies remaining.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600">
                  {lowStockBooks}
                </p>

                <p className="text-xs text-slate-500">
                  {lowStockBooks === 1
                    ? "book needs attention"
                    : "books need attention"}
                </p>
              </div>

              <Link
                href="/admin/books"
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Check Stock
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-slate-900 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold text-white">
              BookStore Admin
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Manage your bookstore from one place.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/books"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              📚 Books
            </Link>

            <Link
              href="/admin/orders"
              className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              📦 Orders
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}