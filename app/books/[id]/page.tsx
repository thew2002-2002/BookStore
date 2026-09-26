import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookDetailsPage({ params }: Props) {
  const { id } = await params;

  const bookId = Number(id);

  if (Number.isNaN(bookId)) {
    notFound();
  }

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    notFound();
  }

  const isOutOfStock = book.stock <= 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
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

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <span>←</span>
            <span>Back to Books</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-blue-600"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-slate-400">
            Books
          </span>

          <span>›</span>

          <span className="max-w-[180px] truncate font-medium text-slate-700">
            {book.title}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-2">
            {/* Left - Book Image */}
            <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 p-8 sm:p-12 lg:min-h-[700px] lg:p-16">
              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100/50" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-100/40" />

              {/* Category badge */}
              <div className="absolute left-6 top-6 z-10 sm:left-8 sm:top-8">
                <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700 shadow-md backdrop-blur">
                  {book.category}
                </span>
              </div>

              {/* Book image */}
              <div className="relative z-10">
                <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl bg-slate-900/10 blur-xl" />

                <img
                  src={book.image}
                  alt={book.title}
                  className="relative h-[460px] w-[310px] rounded-2xl object-cover shadow-2xl transition duration-500 hover:-translate-y-2 hover:rotate-1 sm:h-[560px] sm:w-[375px]"
                />
              </div>
            </div>

            {/* Right - Details */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14 xl:p-16">
              {/* Category */}
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  {book.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                {book.title}
              </h1>

              {/* Author */}
              <p className="mt-4 text-lg text-slate-500">
                Written by{" "}
                <span className="font-semibold text-slate-800">
                  {book.author}
                </span>
              </p>

              {/* Rating / info */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5">
                  <span className="text-amber-500">★</span>
                  <span className="text-sm font-bold text-amber-700">
                    Popular Choice
                  </span>
                </div>

                <div className="h-5 w-px bg-slate-200" />

                <span className="text-sm text-slate-500">
                  📖 Quality Reading
                </span>
              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-slate-200" />

              {/* Description */}
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  About this book
                </h2>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                  {book.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Price
                    </p>

                    <p className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900">
                      Rs. {book.price.toLocaleString()}
                    </p>
                  </div>

                  <div
                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                      isOutOfStock
                        ? "bg-red-100 text-red-700"
                        : book.stock <= 5
                          ? "bg-orange-100 text-orange-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {isOutOfStock
                      ? "Out of Stock"
                      : book.stock <= 5
                        ? `Only ${book.stock} left`
                        : `${book.stock} available`}
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-7">
                <AddToCartButton
                  book={{
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    image: book.image,
                    stock: book.stock,
                  }}
                />
              </div>

              {/* Trust information */}
              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg">
                    🚚
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-slate-500">
                      Islandwide
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-lg">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Quality Books
                    </p>
                    <p className="text-xs text-slate-500">
                      Carefully selected
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-lg">
                    🔒
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-slate-500">
                      Safe & simple
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Keep Exploring
          </p>

          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Find your next favourite book
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Explore our collection and discover books that match
            your interests.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50"
          >
            Browse All Books
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}