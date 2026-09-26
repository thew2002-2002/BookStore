import Link from "next/link";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderSuccessPage({
  params,
}: PageProps) {
  const { id } = await params;

  const orderId = Number(id);

  if (!Number.isInteger(orderId)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
            ✕
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Invalid Order
          </h1>

          <p className="mt-3 text-slate-500">
            The order number you entered is not valid.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          book: true,
        },
      },
    },
  });

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-6xl">😕</div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find an order with this number.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-slate-900"
          >
            📚 BookStore
          </Link>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Continue Shopping →
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        {/* Success Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Success Hero */}
          <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 py-12 text-center md:px-12">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl text-green-600 shadow-sm">
              ✓
            </div>

            <h1 className="mt-7 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Order Placed Successfully!
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-slate-500">
              Thank you for your order,{" "}
              <span className="font-semibold text-slate-700">
                {order.customerName}
              </span>
              . Your order has been received successfully.
            </p>

            {/* Order Number */}
            <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-green-200 bg-white px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Order Number
              </p>

              <p className="mt-1 text-3xl font-black text-slate-900">
                #{order.id}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Keep this number for your records.
              </p>
            </div>
          </div>

          {/* Order Content */}
          <div className="px-6 py-8 md:px-10">
            {/* Order Details */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "book" : "books"} in your
                    order
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-yellow-700">
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="mt-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <img
                      src={item.book.image}
                      alt={item.book.title}
                      className="h-24 w-16 rounded-lg object-cover shadow-sm"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900">
                        {item.book.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        by {item.book.author}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                        <span>Qty: {item.quantity}</span>

                        <span>
                          Rs. {item.price.toLocaleString()} each
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        Rs.{" "}
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Total Amount
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    Including shipping
                  </p>
                </div>

                <p className="text-2xl font-black text-slate-900 md:text-3xl">
                  Rs. {order.total.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-900">
                  📦 Delivery Address
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  {order.address}
                  <br />
                  {order.city} - {order.postalCode}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-sm font-bold text-slate-800">
                  📞 Contact Information
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {order.email}
                  <br />
                  {order.phone}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="flex items-start gap-3">
                <div className="text-xl">⏳</div>

                <div>
                  <p className="font-bold text-yellow-800">
                    Order Status: {order.status}
                  </p>

                  <p className="mt-1 text-sm text-yellow-700">
                    We'll process your order and prepare it for delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="flex-1 rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white transition hover:bg-blue-700"
              >
                Continue Shopping
              </Link>

              <Link
                href="/cart"
                className="flex-1 rounded-xl border border-slate-300 bg-white px-6 py-4 text-center font-bold text-slate-700 transition hover:bg-slate-50"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Thank you for shopping with{" "}
            <span className="font-semibold text-slate-700">
              BookStore
            </span>{" "}
            📚
          </p>
        </div>
      </section>
    </main>
  );
}