"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  const shipping = cart.length > 0 ? 300 : 0;
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-slate-500">
            Please add some books before checking out.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Books
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            📚 BookStore
          </Link>

          <Link
            href="/cart"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            ← Back to Cart
          </Link>
        </div>
      </header>

      {/* Checkout */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">
          Checkout
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your details to place your order.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          
          {/* Customer Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Customer Details
            </h2>

            <form className="mt-6 space-y-5">
              
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="07XXXXXXXX"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  placeholder="Enter your delivery address"
                  required
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Colombo"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postalCode"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Postal Code
                </label>

                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="10100"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-14 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {item.title}
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

            <div className="my-6 border-t" />

            <div className="space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>

                <span>
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>

                <span>
                  Rs. {shipping.toLocaleString()}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-slate-900">
                  <span>Total</span>

                  <span>
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}