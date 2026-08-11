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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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
            ← Back to Books
          </Link>
        </div>
      </header>

      {/* Book Details */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          
          {/* Image */}
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={book.image}
              alt={book.title}
              className="mx-auto h-full max-h-[650px] w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {book.category}
            </span>

            <h1 className="mt-5 text-4xl font-bold text-slate-900">
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              by {book.author}
            </p>

            <p className="mt-6 leading-7 text-slate-600">
              {book.description}
            </p>

            <div className="mt-8">
              <p className="text-3xl font-bold text-slate-900">
                Rs. {book.price.toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {book.stock} books available
              </p>
            </div>

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
        </div>
      </section>
    </main>
  );
}