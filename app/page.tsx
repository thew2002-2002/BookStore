import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CartButton from "./CartButton";

export default async function Home() {
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
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              📚 BookStore
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="font-medium text-slate-700 hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#books"
              className="font-medium text-slate-700 hover:text-blue-600"
            >
              Books
            </a>

            <a
              href="#about"
              className="font-medium text-slate-700 hover:text-blue-600"
            >
              About
            </a>
            <CartButton />
          </nav>

       
         
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-wider text-blue-200">
              Welcome to BookStore
            </p>

            <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Find Your Next
              <br />
              Great Book
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Discover amazing books from different categories and find your
              next favorite story, guide, or idea.
            </p>

            <a
              href="#books"
              className="mt-8 inline-block rounded-lg bg-white px-7 py-3.5 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
            >
              Explore Books →
            </a>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-wider text-blue-600">
            Our Collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Popular Books
          </h2>

          <p className="mt-3 text-slate-600">
            Browse our collection and discover something new to read.
          </p>
        </div>

        {/* Book Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
             className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
              {/* Book Image */}
              <div className="aspect-[2/3] overflow-hidden bg-slate-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              {/* Book Details */}
              <div className="p-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {book.category}
                </span>

                <h3 className="mt-4 line-clamp-2 text-xl font-bold text-slate-900">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  by {book.author}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {book.description}
                </p>

                {/* Price + Button */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-slate-900">
                      Rs. {book.price.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {book.stock} in stock
                    </p>
                  </div>

                  
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Books */}
        {books.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-lg font-medium text-slate-700">
              No books available.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Please add some books to your database.
            </p>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            About BookStore
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            BookStore is your simple online destination for discovering and
            buying great books. We are building a better reading experience
            one book at a time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-slate-400">
            © 2026 BookStore. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}