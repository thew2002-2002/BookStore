"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const shipping = 300;
  const grandTotal = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="group flex items-center gap-2"
            >
              <span className="text-3xl transition-transform group-hover:scale-110">
                📚
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                BookStore
              </span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>←</span>
              Continue Shopping
            </Link>
          </div>
        </header>

        {/* Empty Cart */}
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-16">
          <div className="w-full max-w-lg text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-5xl shadow-sm">
              🛒
            </div>

            <h1 className="mt-7 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-slate-500">
              Looks like you haven't added any books yet. Explore our
              collection and find something you love.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Browse Books
              <span>→</span>
            </Link>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                📚 Great Collection
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
                🚚 Islandwide Delivery
              </span>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <span className="text-3xl transition-transform group-hover:scale-110">
              📚
            </span>

            <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              BookStore
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <span>←</span>
            <span>Continue Shopping</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Shopping Cart
          </p>

          <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Your Cart 🛒
              </h1>

              <p className="mt-2 text-slate-500">
                Review your books before proceeding to checkout.
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              {cart.reduce((total, item) => total + item.quantity, 0)}{" "}
              {cart.reduce(
                (total, item) => total + item.quantity,
                0
              ) === 1
                ? "item"
                : "items"}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* ================= CART ITEMS ================= */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
              >
                <div className="flex gap-4 sm:gap-5">
                  {/* Image */}
                  <Link
                    href={`/books/${item.id}`}
                    className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-40 sm:w-28"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/books/${item.id}`}>
                          <h2 className="line-clamp-2 text-lg font-extrabold leading-6 text-slate-900 transition hover:text-blue-600 sm:text-xl">
                            {item.title}
                          </h2>
                        </Link>

                        <p className="mt-1 text-sm text-slate-500">
                          by {item.author}
                        </p>
                      </div>

                      {/* Desktop Total */}
                      <p className="hidden whitespace-nowrap text-lg font-extrabold text-slate-900 sm:block">
                        Rs.{" "}
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Price */}
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      Rs. {item.price.toLocaleString()}{" "}
                      <span className="font-normal text-slate-400">
                        per book
                      </span>
                    </p>

                    {/* Controls */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition hover:bg-white hover:text-blue-600"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>

                        <span className="w-9 text-center text-sm font-bold text-slate-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-slate-600 transition hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs text-slate-400">
                        Max {item.stock} available
                      </span>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-sm font-semibold text-red-500 transition hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    {/* Mobile Total */}
                    <p className="mt-4 text-base font-extrabold text-slate-900 sm:hidden">
                      Total: Rs.{" "}
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700"
              >
                ← Continue browsing books
              </Link>
            </div>
          </div>

          {/* ================= SUMMARY ================= */}
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Summary Header */}
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Order Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your order details
                </p>
              </div>

              {/* Summary Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Subtotal</span>

                    <span className="font-semibold text-slate-900">
                      Rs. {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Shipping</span>

                    <span className="font-semibold text-slate-900">
                      Rs. {shipping.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-dashed border-slate-200" />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      Total
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                      Rs. {grandTotal.toLocaleString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                    Secure
                  </span>
                </div>

                {/* Checkout */}
                <Link
                  href="/checkout"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Proceed to Checkout
                  <span>→</span>
                </Link>

                {/* Benefits */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">
                      🚚
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Islandwide Delivery
                      </p>

                      <p className="text-xs text-slate-400">
                        Delivery available across Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50">
                      🔒
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Secure Checkout
                      </p>

                      <p className="text-xs text-slate-400">
                        Safe and simple ordering
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}