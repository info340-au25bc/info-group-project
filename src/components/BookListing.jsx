import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

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

  const [allBooks, setAllBooks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [searchText, setSearchText] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const allBooksRef = ref(database, 'books');

    setIsLoading(true);
    setErrorMessage('');

    const unsubscribe = onValue(
      allBooksRef,
      (snapshot) => {
        const fbData = snapshot.val();

        if (fbData) {
          const keys = Object.keys(fbData);
          const bookArray = [];

          for (let i = 0; i < keys.length; i++) {
            const bookKey = keys[i];
            const bookData = fbData[bookKey];
            const bookObj = {
              id: bookKey,
              title: bookData.title,
              author: bookData.author,
              genre: bookData.genre,
              status: bookData.status,
              color: bookData.color,
              tags: bookData.tags || []
            };
            bookArray.push(bookObj);
          }

          setAllBooks(bookArray);
        } else {
          setAllBooks([]);
        }

        setIsLoading(false);
      },
      () => {
        setErrorMessage('Failed to load your books. Please try again.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  let displayBooks = [...allBooks];

  if (statusFilter !== 'all') {
    displayBooks = displayBooks.filter((book) => {
      return book.status === statusFilter;
    });
  }

  if (tagFilter !== 'all') {
    displayBooks = displayBooks.filter((book) => {
      return book.tags && book.tags.includes(tagFilter);
    });
  }

  if (searchText !== '') {
    displayBooks = displayBooks.filter((book) => {
      const search = searchText.toLowerCase();
      const titleMatch = book.title.toLowerCase().includes(search);
      const authorMatch = book.author.toLowerCase().includes(search);
      return titleMatch || authorMatch;
    });
  }

  if (sortBy === 'title') {
    displayBooks = displayBooks.sort((bookA, bookB) => {
      return bookA.title.localeCompare(bookB.title);
    });
  } else if (sortBy === 'author') {
    displayBooks = displayBooks.sort((bookA, bookB) => {
      return bookA.author.localeCompare(bookB.author);
    });
  } else if (sortBy === 'status') {
    displayBooks = displayBooks.sort((bookA, bookB) => {
      return bookA.status.localeCompare(bookB.status);
    });
  } else if (sortBy === 'genre') {
    displayBooks = displayBooks.sort((bookA, bookB) => {
      return bookA.genre.localeCompare(bookB.genre);
    });
  }

  const bookCards = displayBooks.map((book) => (
    <BookCard key={book.id} book={book} />
  ));

  if (isLoading) {
    return (
      <main className="book-page">
        <p className="loading-banner">Loading your books...</p>
      </main>
    );
  }

  return (
    <main className="book-page">
      <section className="book-header-section">
        <h1 className="book-list-title">Your Personal <span>Library</span></h1>
        <p className="book-list-subtitle">All your books, organized and ready to explore.</p>
      </section>

      <section className="book-content">
        {errorMessage && (
          <p className="error-banner">{errorMessage}</p>
        )}

        <div className="book-header">
          <h2 className="collection-heading">My Book Collection</h2>
          <Link to="/bookentry" className="add-book-btn">+ Add New Book</Link>
        </div>

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

          <div className="filter-section">
            <label htmlFor="tag-filter">Filter by Tag:</label>
            <select
              id="tag-filter"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="all">All Tags</option>
              <option value="Inspirational">Inspirational</option>
              <option value="Dark">Dark</option>
              <option value="Emotional">Emotional</option>
              <option value="Uplifting">Uplifting</option>
              <option value="Thought-provoking">Thought-provoking</option>
              <option value="Suspenseful">Suspenseful</option>
              <option value="Heartwarming">Heartwarming</option>
              <option value="Adventurous">Adventurous</option>
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
              <option value="genre">Genre (A-Z)</option>
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

        <div className="book-grid">
          {displayBooks.length > 0 ? (
            bookCards
          ) : (
            <p className="no-books-message">No books found matching your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}