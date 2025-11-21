import React from 'react';
import { BOOKS_DATA } from '../data/booksData';

function BookCard({ book }) {
  const statuses = {
    "reading": "Reading",
    "completed": "Completed",
    "want-to-read": "Want to Read"
  };
  
  return (
    <div className="book-card">
      <div className="book-spine" style={{ backgroundColor: book.color }}>
        {book.title}
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <span className={`book-status ${book.status === 'completed' ? 'completed' : ''}`}>
          {statuses[book.status]}
        </span>
      </div>
    </div>
  );
}

export default function BookListing() {
  
  return (
    <main className="book-page">
      <section className="book-header-section">
        <h1 className="book-list-title">Your Personal <span>Library</span></h1>
        <p className="book-list-subtitle">All your books, organized and ready to explore.</p>
      </section>

      <section className="book-content">
        <div className="book-header">
          <h2 className="collection-heading">My Book Collection</h2>
          <a href="BookEntry.html" className="add-book-btn">+ Add New Book</a>
        </div>
        
        {/* filter or sort  */}
        <div className="filter-sort-container">
          <div className="filter-section">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select id="status-filter">
              <option value="all">All Books</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
              <option value="want-to-read">Want to Read</option>
            </select>
          </div>
          
          <div className="sort-section">
            <label htmlFor="sort-options">Sort by:</label>
            <select id="sort-options">
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="status">Reading Status</option>
              <option value="date-added">Date Added</option>
            </select>
          </div>
          
          <div className="search-section">
            <label htmlFor="book-search">Search:</label>
            <input type="text" id="book-search" placeholder="Search books or authors..." />
          </div>
        </div>
        
        {/* Book Grid - using .map() to display books */}
        <div className="book-grid">
          {BOOKS_DATA.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
