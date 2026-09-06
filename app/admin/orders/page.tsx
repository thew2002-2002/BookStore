import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusDropdown from "./StatusDropdown";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      items: {
        include: {
          book: true,
        },
      },
    },
  });

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
        <h1 className="text-3xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Manage customer orders and view order details.
        </p>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">📦</div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No Orders Yet
            </h2>

            <p className="mt-2 text-slate-500">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row md:items-center">
                  <div>
                    <p className="text-sm text-slate-500">
                      Order Number
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900">
                      #{order.id}
                    </h2>
                  </div>

                  <StatusDropdown
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Customer */}
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Customer Details
                    </h3>

                    <div className="mt-3 space-y-1 text-sm text-slate-600">
                      <p>
                        <strong>Name:</strong> {order.customerName}
                      </p>

                      <p>
                        <strong>Email:</strong> {order.email}
                      </p>

                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>

                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>

                      <p>
                        <strong>City:</strong> {order.city}
                      </p>

                      <p>
                        <strong>Postal Code:</strong> {order.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Payment Summary
                    </h3>

                    <p className="mt-3 text-2xl font-bold text-blue-600">
                      Rs. {order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Books */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-bold text-slate-900">
                    Ordered Books
                  </h3>

                  <div className="mt-4 space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
                      >
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="h-16 w-12 rounded object-cover"
                        />

                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">
                            {item.book.title}
                          </p>

                          <p className="text-sm text-slate-500">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold text-slate-900">
                          Rs.{" "}
                          {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}