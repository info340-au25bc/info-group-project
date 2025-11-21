import React from 'react';
import { useParams, useNavigate } from 'react-router';

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // placeholder rn
  const book = {
    title: "Book Title",
    author: "Author Name",
    genre: "Fiction",
    status: "Currently Reading",
    cover: "/img/book_cover.jpg",
    description: "A novel set in...",
    notes: "What an interesting book! I particularly enjoyed when the author mentioned... Insert \"quote from book.\""
  };

  const handleEdit = () => {
    console.log("Edit book:", bookId);
  };

  const handleDelete = () => {
    console.log("Delete book:", bookId);
    navigate('/allbooks');
  };

  const handleJournal = () => {
    navigate('/journal');
  };

  return (
    <main className="book-details">
      <div className="book-cover">
        <img src={book.cover} alt={`${book.title} cover`} />
      </div>

      <div className="book-info">
        <button className="close-btn-details" onClick={() => navigate('/allbooks')}>×</button>
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author"><i>{book.author}</i></p>
        <p className="book-genre"><strong>Genre:</strong> {book.genre}</p>
        <p className="book-status"><strong>Status:</strong> {book.status}</p>

        <div className="book-description">
          <h3>Description</h3>
          <p>{book.description}</p>
        </div>

        <div className="book-notes">
          <h3>Notes</h3>
          <p>{book.notes}</p>
        </div>

        <div className="book-actions">
          <div className="primary-actions">
            <button className="edit-btn" onClick={handleEdit}>Edit Book</button>
            <button className="journal-btn" onClick={handleJournal}>Journal</button>
          </div>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </main>
  );
}
