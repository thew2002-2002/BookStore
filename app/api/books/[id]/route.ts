import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// GET - Get one book
export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const bookId = Number(id);

    if (!Number.isInteger(bookId)) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      book,
    });
  } catch (error) {
    console.error("Get book error:", error);

    return NextResponse.json(
      { error: "Failed to get book." },
      { status: 500 }
    );
  }
}

// PATCH - Update one book
export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const bookId = Number(id);

    if (!Number.isInteger(bookId)) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const {
      title,
      author,
      description,
      price,
      image,
      category,
      stock,
    } = body;

    if (
      !title ||
      !author ||
      !description ||
      !image ||
      !category
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (Number(price) < 0 || Number(stock) < 0) {
      return NextResponse.json(
        { error: "Price and stock cannot be negative." },
        { status: 400 }
      );
    }

    const existingBook = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        title: String(title),
        author: String(author),
        description: String(description),
        price: Number(price),
        image: String(image),
        category: String(category),
        stock: Number(stock),
      },
    });

    return NextResponse.json({
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    console.error("Update book error:", error);

    return NextResponse.json(
      { error: "Failed to update book." },
      { status: 500 }
    );
  }
}

// DELETE - Delete one book
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const bookId = Number(id);

    if (!Number.isInteger(bookId)) {
      return NextResponse.json(
        { error: "Invalid book ID." },
        { status: 400 }
      );
    }

    const existingBook = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!existingBook) {
      return NextResponse.json(
        { error: "Book not found." },
        { status: 404 }
      );
    }

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error) {
    console.error("Delete book error:", error);

    return NextResponse.json(
      { error: "Failed to delete book." },
      { status: 500 }
    );
  }
}