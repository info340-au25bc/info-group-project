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
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  
  // filter 
  let filteredBooks = BOOKS_DATA.filter((book) => {
    if (statusFilter === 'all') return true;
    return book.status === statusFilter;
  });
  
  // search
  if (searchQuery.trim() !== '') {
    filteredBooks = filteredBooks.filter((book) => {
      const query = searchQuery.toLowerCase();
      return book.title.toLowerCase().includes(query) || 
             book.author.toLowerCase().includes(query);
    });
  }
  
  // book sortation
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });
  
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
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
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
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Book Grid - using .map() to display filtered and sorted books */}
        <div className="book-grid">
          {sortedBooks.length > 0 ? (
            sortedBooks.map((book) => (
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
