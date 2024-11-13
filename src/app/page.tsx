'use client'
import { useState, useEffect } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  available: boolean;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('/api/books');
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async () => {
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      setNewBook({ title: '', author: '' });
      setMessage('Book added successfully!');
      fetchBooks(); 
    } else {
      setMessage('Failed to add book');
    }
  };

  const updateBook = async (id: number, updatedTitle: string, updatedAuthor: string) => {
    const response = await fetch('/api/books', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, title: updatedTitle, author: updatedAuthor }),
    });

    if (response.ok) {
      setMessage('Book updated successfully!');
      fetchBooks(); 
    } else {
      setMessage('Failed to update book');
    }
  };

  const deleteBook = async (id: number) => {
    const response = await fetch('/api/books', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setMessage('Book deleted successfully!');
      fetchBooks(); 
    } else {
      setMessage('Failed to delete book');
    }
  };

  return (
    <div>
      <h1>Books Collection</h1>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div>
        <button onClick={addBook}>POST Book</button>
      </div>

      {message && <p>{message}</p>}

      <h2>Book List</h2>
      <ul>
        {books.map((book:Book) => (
          <li key={book.id}>
            <span>{book.title} by {book.author}</span>
            <button onClick={() => updateBook(book.id, prompt("New Title", book.title) || book.title, prompt("New Author", book.author) || book.author)}>
              Update
            </button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

