import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SHIPPING = 300;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerName,
      email,
      phone,
      address,
      city,
      postalCode,
      items,
    } = body;

    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !postalCode
    ) {
      return NextResponse.json(
        { error: "Please fill in all customer details." },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    const bookIds = items.map((item: { bookId: number }) => item.bookId);

    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    if (books.length !== items.length) {
      return NextResponse.json(
        { error: "One or more books were not found." },
        { status: 400 }
      );
    }

    let subtotal = 0;

    for (const item of items) {
      const book = books.find((b) => b.id === item.bookId);

      if (!book) {
        return NextResponse.json(
          { error: "Book not found." },
          { status: 400 }
        );
      }

      if (item.quantity <= 0) {
        return NextResponse.json(
          { error: "Invalid quantity." },
          { status: 400 }
        );
      }

      if (book.stock < item.quantity) {
        return NextResponse.json(
          {
            error: `"${book.title}" does not have enough stock.`,
          },
          { status: 400 }
        );
      }

      subtotal += book.price * item.quantity;
    }

    const total = subtotal + SHIPPING;

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          customerName,
          email,
          phone,
          address,
          city,
          postalCode,
          total,
          status: "PENDING",
        },
      });

      for (const item of items) {
        const book = books.find((b) => b.id === item.bookId)!;

        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            bookId: book.id,
            quantity: item.quantity,
            price: book.price,
          },
        });

        await tx.book.update({
          where: {
            id: book.id,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      total,
    });
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating the order." },
      { status: 500 }
    );
  }
}