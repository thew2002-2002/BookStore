import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Delete existing order items first
  await prisma.orderItem.deleteMany();

  // Delete existing orders
  await prisma.order.deleteMany();

  // Now books can be deleted safely
  await prisma.book.deleteMany();

  // Create sample books
  const result = await prisma.book.createMany({
    data: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        description:
          "A practical guide to building good habits and breaking bad ones.",
        price: 4500,
        image: "https://placehold.co/400x600?text=Atomic+Habits",
        category: "Self Help",
        stock: 20,
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description:
          "A young shepherd follows his dreams and discovers his personal legend.",
        price: 3200,
        image: "https://placehold.co/400x600?text=The+Alchemist",
        category: "Fiction",
        stock: 15,
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        description:
          "A guide to writing clean, readable, maintainable software.",
        price: 6500,
        image: "https://placehold.co/400x600?text=Clean+Code",
        category: "Technology",
        stock: 10,
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        description:
          "Timeless lessons about money, investing, and financial behavior.",
        price: 4200,
        image: "https://placehold.co/400x600?text=Psychology+of+Money",
        category: "Finance",
        stock: 18,
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        description:
          "A personal finance book about developing financial knowledge and independence.",
        price: 3800,
        image: "https://placehold.co/400x600?text=Rich+Dad+Poor+Dad",
        category: "Finance",
        stock: 12,
      },
    ],
  });

  console.log(`Successfully added ${result.count} books!`);

  // Create admin password hash
  const passwordHash = await bcrypt.hash("admin123", 10);

  // Create or update admin account
  await prisma.admin.upsert({
    where: {
      email: "admin@bookstore.com",
    },
    update: {
      passwordHash,
    },
    create: {
      email: "admin@bookstore.com",
      passwordHash,
    },
  });

  console.log("Admin account created successfully!");
  console.log("Email: admin@bookstore.com");
  console.log("Password: admin123");
}
main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });