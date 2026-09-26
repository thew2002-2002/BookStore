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
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
          >
            <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
              📚
            </span>

            <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              BookStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              Home
            </a>

            <a
              href="#books"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              Books
            </a>

            <a
              href="#about"
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
            >
              About
            </a>

            <CartButton />
          </nav>

          {/* Mobile Cart */}
          <div className="md:hidden">
            <CartButton />
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900"
      >
        {/* Decorative circles */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold text-blue-100">
                  Your next great read starts here
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Discover Your
                <span className="block text-blue-200">
                  Next Great Book
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
                Explore our growing collection of inspiring stories,
                practical guides, timeless classics, and powerful ideas.
                Find a book that stays with you long after the final page.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#books"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-xl transition duration-200 hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Explore Books
                  <span>→</span>
                </a>

                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Learn More
                </a>
              </div>

              {/* Hero Stats */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
                <div>
                  <p className="text-2xl font-extrabold text-white">
                    {books.length}+
                  </p>
                  <p className="mt-1 text-sm text-blue-200">
                    Books Available
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-white">
                    100%
                  </p>
                  <p className="mt-1 text-sm text-blue-200">
                    Quality Collection
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-white">
                    📦
                  </p>
                  <p className="mt-1 text-sm text-blue-200">
                    Islandwide Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative mx-auto h-[480px] w-[380px]">
                {/* Back book */}
                {books[1] && (
                  <div className="absolute right-0 top-8 w-56 rotate-12 overflow-hidden rounded-2xl shadow-2xl opacity-70">
                    <img
                      src={books[1].image}
                      alt={books[1].title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </div>
                )}

                {/* Main book */}
                {books[0] && (
                  <div className="absolute left-0 top-0 z-10 w-64 -rotate-6 overflow-hidden rounded-2xl shadow-2xl transition duration-500 hover:-translate-y-3 hover:rotate-0">
                    <img
                      src={books[0].image}
                      alt={books[0].title}
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </div>
                )}

                {/* Floating badge */}
                <div className="absolute bottom-16 right-0 z-20 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-xl">
                      ⭐
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Great Books
                      </p>
                      <p className="text-xs text-slate-500">
                        Worth discovering
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOOKS ================= */}
      <section
        id="books"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Popular Books
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Browse our collection and discover your next favourite
              book.
            </p>
          </div>

          <div className="hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200 sm:block">
            📚 {books.length} books
          </div>
        </div>

        {/* Book Cards */}
        {books.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/books/${book.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* Category */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-md backdrop-blur">
                      {book.category}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="absolute bottom-4 left-4">
                    {book.stock > 0 ? (
                      <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        In Stock
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="line-clamp-2 min-h-[56px] text-lg font-extrabold leading-7 text-slate-900 transition group-hover:text-blue-600">
                    {book.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    by {book.author}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
                    {book.description}
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xl font-extrabold text-slate-900">
                        Rs. {book.price.toLocaleString()}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {book.stock > 0
                          ? `${book.stock} available`
                          : "Currently unavailable"}
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg text-blue-600 transition duration-200 group-hover:bg-blue-600 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
              📚
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No books available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please add some books to your collection.
            </p>
          </div>
        )}
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              🚚
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Islandwide Delivery
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Get your favourite books delivered to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
              📖
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Quality Collection
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Carefully selected books across different categories.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-2xl">
              🔒
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Secure Checkout
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Simple and secure ordering experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="bg-slate-50 px-5 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            About Us
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Books that inspire, educate & entertain
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            BookStore is your simple online destination for discovering
            and buying great books. From timeless classics to practical
            guides and inspiring stories, we are building a better
            reading experience one book at a time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              📚 Great Selection
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              💙 Reader Focused
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              🚀 Simple Experience
            </span>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <span className="text-2xl">📚</span>

              <span className="font-bold text-white">
                BookStore
              </span>
            </Link>

            <p className="text-center text-sm text-slate-500">
              © 2026 BookStore. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm text-slate-400">
              <a
                href="#home"
                className="transition hover:text-white"
              >
                Home
              </a>

              <a
                href="#books"
                className="transition hover:text-white"
              >
                Books
              </a>

              <a
                href="#about"
                className="transition hover:text-white"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}