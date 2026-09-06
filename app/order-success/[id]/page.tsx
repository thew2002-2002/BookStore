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
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Invalid Order
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
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
        <div className="text-center">
          <div className="text-6xl">😕</div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            We couldn't find this order.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
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
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            📚 BookStore
          </Link>
        </div>
      </header>

      {/* Success */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-slate-500">
            Thank you for your order, {order.customerName}.
          </p>

          {/* Order ID */}
          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Order Number
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              #{order.id}
            </p>
          </div>

          {/* Order Items */}
          <div className="mt-8 text-left">
            <h2 className="text-xl font-bold text-slate-900">
              Order Details
            </h2>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
                >
                  <img
                    src={item.book.image}
                    alt={item.book.title}
                    className="h-20 w-14 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {item.book.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Rs. {item.price.toLocaleString()} each
                    </p>
                  </div>

                  <p className="font-bold text-slate-900">
                    Rs.{" "}
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between text-slate-600">
              <span>Order Total</span>

              <span className="text-2xl font-bold text-slate-900">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 rounded-lg bg-yellow-50 px-4 py-3">
            <p className="text-sm font-medium text-yellow-700">
              Order Status: {order.status}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Link>

            <Link
              href="/cart"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}