"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
};

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadBook() {
      try {
        const response = await fetch(`/api/books/${id}`);

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data = await response.json();
        setBook(data.book);
      } catch (error) {
        console.error(error);
        alert("Could not load book.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!book) return;

    setSaving(true);

    const formData = new FormData(event.currentTarget);

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
      const response = await fetch(`/api/books/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update book");
      }

      alert("Book updated successfully! ✅");

      router.push("/admin/books");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading book...</p>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Book not found
        </h1>

        <Link
          href="/admin/books"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          Back to Books
        </Link>
      </main>
    );
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

      {/* Page */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Inventory
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Edit Book
          </h1>

          <p className="mt-2 text-slate-500">
            Update the details of this book.
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
                defaultValue={book.title}
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
                defaultValue={book.author}
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
                defaultValue={book.category}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
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
                defaultValue={book.description}
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
                  defaultValue={book.price}
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
                  defaultValue={book.stock}
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
                defaultValue={book.image}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
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
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}