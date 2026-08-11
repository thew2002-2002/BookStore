"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;
    stock: number;
  };
};

export default function AddToCartButton({ book }: Props) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(book);
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={book.stock === 0}
      className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {book.stock === 0
        ? "Out of Stock"
        : "🛒 Add to Cart"}
    </button>
  );
}