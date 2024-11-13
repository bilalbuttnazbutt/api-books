import { NextResponse } from 'next/server';

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", available: true }
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const { title, author } = await request.json();
  const newBook = { id: Date.now(), title, author, available: true };
  books.push(newBook);
  return NextResponse.json(newBook, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, title, author } = await request.json();
  const bookIndex = books.findIndex((book) => book.id === id);
  
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, author, available: true };
    return NextResponse.json(books[bookIndex]);
  }
  
  return NextResponse.json({ message: "Book not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: "Book deleted" }, { status: 200 });
}

