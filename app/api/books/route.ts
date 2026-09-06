import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
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

    const book = await prisma.book.create({
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

    return NextResponse.json(
      {
        success: true,
        book,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create book error:", error);

    return NextResponse.json(
      { error: "Failed to create book." },
      { status: 500 }
    );
  }
}