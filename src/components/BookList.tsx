type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
  };

interface BookListProps {
    books: Book[];
    onDelete: (id: number) => void;
    onUpdate: (book: Book) => void;
};

const BookList: React.FC<BookListProps> = ({ books, onDelete, onUpdate }) => {
    return (
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <span>{book.title} by {book.author}</span>
                    <button onClick={() => onDelete(book.id)}>Delete</button>
                    <button onClick={() => onUpdate(book)}>Edit</button>
                </li>
            ))}
        </ul>
    );
};

export default BookList;
