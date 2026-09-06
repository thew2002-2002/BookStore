"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

export default function BookFilters({
  books,
}: {
  books: Book[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(books.map((book) => book.category))),
  ];

  const filteredBooks = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <>
      {/* Filters */}
      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          {/* Search */}
          <div>
            <label
              htmlFor="book-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search Books
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                🔎
              </span>

              <input
                id="book-search"
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by title or author..."
                className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredBooks.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {books.length}
            </span>{" "}
            books
          </p>

          {(search || category !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* No results */}
      {filteredBooks.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">🔎</div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            No Books Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try a different search or category.
          </p>
        </div>
      ) : (
        /* Books table */
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Book
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Book */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-16 w-12 rounded-md object-cover"
                        />

                        <div>
                          <p className="font-semibold text-slate-900">
                            {book.title}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                        {book.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-semibold text-slate-900">
                      Rs. {book.price.toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-5">
                      {book.stock === 0 ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Out of Stock
                        </span>
                      ) : book.stock <= 5 ? (
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                          {book.stock} — Low Stock
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                          {book.stock} Available
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/books/${book.id}/edit`}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Edit
                        </Link>

                        {/* Delete */}
                        <DeleteButton id={book.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function DeleteButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      onClick={async () => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this book?"
        );

        if (!confirmed) return;

        const response = await fetch(`/api/books/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          alert("Failed to delete book.");
          return;
        }

        window.location.reload();
      }}
      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}