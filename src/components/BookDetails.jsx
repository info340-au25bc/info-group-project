import React from 'react';
import { useParams, useNavigate } from 'react-router';

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // Placeholder book data (in a real app, this would come from a database)
  const currentBook = {
    title: "Book Title",
    author: "Author Name",
    genre: "Fiction",
    status: "Currently Reading",
    cover: "/img/book_cover.jpg",
    description: "A novel set in...",
    notes: "What an interesting book! I particularly enjoyed when the author mentioned... Insert \"quote from book.\""
  };


  function clickEditButton() {
    console.log("Edit book:", bookId);
  }

  function clickDeleteButton() {
    console.log("Delete book:", bookId);
    navigate('/allbooks');
  }

  function clickJournalButton() {
    navigate('/journal');
  }

  return (
    <main className="book-details">
      <div className="book-cover">
        <img src={currentBook.cover} alt={`${currentBook.title} cover`} />
      </div>

      <div className="book-info">
        <button className="close-btn-details" onClick={() => navigate('/allbooks')}>×</button>
        <h2 className="book-title">{currentBook.title}</h2>
        <p className="book-author"><i>{currentBook.author}</i></p>
        <p className="book-genre"><strong>Genre:</strong> {currentBook.genre}</p>
        <p className="book-status"><strong>Status:</strong> {currentBook.status}</p>

        <div className="book-description">
          <h3>Description</h3>
          <p>{currentBook.description}</p>
        </div>

        <div className="book-notes">
          <h3>Notes</h3>
          <p>{currentBook.notes}</p>
        </div>

        <div className="book-actions">
          <div className="primary-actions">
            <button className="edit-btn" onClick={clickEditButton}>Edit Book</button>
            <button className="journal-btn" onClick={clickJournalButton}>Journal</button>
          </div>
          <button className="delete-btn" onClick={clickDeleteButton}>Delete</button>
        </div>
      </div>
    </main>
  );
}
