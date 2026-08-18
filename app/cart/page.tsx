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

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-slate-500">
            You haven't added any books yet.
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
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-2xl font-bold text-slate-900"
          >
            📚 BookStore
          </Link>

          <Link
            href="/"
            className="font-medium text-slate-700 hover:text-blue-600"
          >
            ← Continue Shopping
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">
          🛒 Your Cart
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
          
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-24 rounded-lg object-cover"
                />

                <div className="flex flex-1 flex-col">
                  <h2 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-slate-500">
                    by {item.author}
                  </p>

                  <p className="mt-3 font-semibold text-slate-900">
                    Rs. {item.price.toLocaleString()}
                  </p>

                  <div className="mt-auto flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      disabled={item.quantity >= item.stock}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-sm font-medium text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right font-bold text-slate-900">
                  Rs.{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>Rs. 300</span>
            </div>

            <div className="my-5 border-t" />

            <div className="flex justify-between text-xl font-bold text-slate-900">
              <span>Total</span>
              <span>
                Rs. {(cartTotal + 300).toLocaleString()}
              </span>
            </div>

            <Link
                href="/checkout"
                className="mt-6 block w-full rounded-lg bg-blue-600 px-6 py-4 text-center font-semibold text-white hover:bg-blue-700"
    >
                Proceed to Checkout
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}