import React, { useState } from 'react';
import { Link } from 'react-router';
import { BOOKS_DATA } from '../data/booksData';

function BookCard({ book }) {
  const statuses = {
    "reading": "Reading",
    "completed": "Completed",
    "want-to-read": "Want to Read"
  };
  
  return (
    <Link to={`/book/${book.id}`} className="book-card-link">
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
    </Link>
  );
}

export default function BookListing() {
  // state
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSortOption, setSelectedSortOption] = useState('title');
  const [searchText, setSearchText] = useState('');
  
  // Step 1: filter
  let booksToDisplay = BOOKS_DATA;
  
  if (selectedStatus !== 'all') {
    booksToDisplay = booksToDisplay.filter((book) => {
      return book.status === selectedStatus;
    });
  }
  
  // Step 2: Filter books by search text
  if (searchText !== '') {
    booksToDisplay = booksToDisplay.filter((book) => {
      const lowerCaseSearch = searchText.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(lowerCaseSearch);
      const authorMatch = book.author.toLowerCase().includes(lowerCaseSearch);
      return titleMatch || authorMatch;
    });
  }
  
  // sortation books
  if (selectedSortOption === 'title') {
    booksToDisplay = booksToDisplay.sort((bookA, bookB) => {
      return bookA.title.localeCompare(bookB.title);
    });
  } else if (selectedSortOption === 'author') {
    booksToDisplay = booksToDisplay.sort((bookA, bookB) => {
      return bookA.author.localeCompare(bookB.author);
    });
  } else if (selectedSortOption === 'status') {
    booksToDisplay = booksToDisplay.sort((bookA, bookB) => {
      return bookA.status.localeCompare(bookB.status);
    });
  }
  
  return (
    <main className="book-page">
      <section className="book-header-section">
        <h1 className="book-list-title">Your Personal <span>Library</span></h1>
        <p className="book-list-subtitle">All your books, organized and ready to explore.</p>
      </section>

      <section className="book-content">
        <div className="book-header">
          <h2 className="collection-heading">My Book Collection</h2>
          <Link to="/bookentry" className="add-book-btn">+ Add New Book</Link>
        </div>
        
        {/* filter or sort*/}
        <div className="filter-sort-container">
          <div className="filter-section">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select 
              id="status-filter" 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Books</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
              <option value="want-to-read">Want to Read</option>
            </select>
          </div>
          
          <div className="sort-section">
            <label htmlFor="sort-options">Sort by:</label>
            <select 
              id="sort-options" 
              value={selectedSortOption} 
              onChange={(e) => setSelectedSortOption(e.target.value)}
            >
              <option value="title">Title (A-Z)</option>
              <option value="author">Author (A-Z)</option>
              <option value="status">Reading Status</option>
            </select>
          </div>
          
          <div className="search-section">
            <label htmlFor="book-search">Search:</label>
            <input 
              type="text" 
              id="book-search" 
              placeholder="Search books or authors..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        
        {/* Book Grid - using .map() to display filtered and sorted books */}
        <div className="book-grid">
          {booksToDisplay.length > 0 ? (
            booksToDisplay.map((book) => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <p className="no-books-message">No books found matching your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}
