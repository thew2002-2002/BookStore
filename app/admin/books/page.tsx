import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BookFilters from "./BookFilters";

export default async function AdminBooksPage() {
  const books = await prisma.book.findMany({
    orderBy: {
      id: "desc",
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
            href="/admin"
            className="font-medium text-slate-600 hover:text-blue-600"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* Page */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Inventory
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Books
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your bookstore inventory.
            </p>
          </div>

          <Link
            href="/admin/books/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            + Add New Book
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">📚</div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No Books Found
            </h2>

            <p className="mt-2 text-slate-500">
              Add your first book to the store.
            </p>
          </div>
        ) : (
          <BookFilters books={books} />
        )}

        {/* Back */}
        <div className="mt-6">
          <Link
            href="/admin"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}