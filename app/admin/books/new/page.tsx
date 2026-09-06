"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function NewBookPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      image: formData.get("image"),
      category: formData.get("category"),
      stock: Number(formData.get("stock")),
    };

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create book");
      }

      alert("Book added successfully! 📚");

      form.reset();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

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
            href="/admin/books"
            className="font-medium text-slate-600 hover:text-blue-600"
          >
            ← Back to Books
          </Link>
        </div>
      </header>

      {/* Form */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Inventory
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Add New Book
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new book to your bookstore inventory.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-8"
        >
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Book Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Atomic Habits"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Author
              </label>

              <input
                id="author"
                name="author"
                type="text"
                placeholder="James Clear"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Self Help">Self Help</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Biography">Biography</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Write a short description about the book..."
                required
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Price + Stock */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Price (Rs.)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="4500"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="20"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Book Image URL
              </label>

              <input
                id="image"
                name="image"
                type="url"
                placeholder="https://placehold.co/400x600?text=My+Book"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Paste a publicly accessible image URL.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/books"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}