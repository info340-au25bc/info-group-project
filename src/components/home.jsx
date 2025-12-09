import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function HomePage() {
  const [recentBooks, setRecentBooks] = useState([]);
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
              color: bookData.color
            };
            bookArray.push(bookObj);
          }
          
          const mostRecent = bookArray.slice(-5);
          setRecentBooks(mostRecent);
        } else {
          setRecentBooks([]);
        }

        setIsLoading(false);
      },
      () => {
        setErrorMessage('Failed to load recent books. Please try again.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const recentBookLinks = recentBooks.map((book) => (
    <Link key={book.id} to={`/book/${book.id}`} className="book-card-link">
      <div className="book" style={{ backgroundColor: book.color }}>
        {book.title}
      </div>
    </Link>
  ));

  return (
    <main className="home-main">
      <section className="home-banner">
        <h1 className="home-title">
          Welcome back to <span>BookBuddy!</span>
        </h1>
        <p className="home-subtitle">
          Your personal library, goals, and reflections all in one spot.
        </p>
      </section>

      <section className="home-image">
        <h2 className="visually-hidden">Bookshelf Illustration</h2>
        <Link to="/allbooks">
          <img
            src="img/bookshelf.jpg"
            alt="Bookshelf illustration"
            className="center-image"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </section>

      <section className="home-shelf">
        <h2 className="shelf-heading">Recently Added Books</h2>

        {errorMessage && (
          <p className="error-banner">{errorMessage}</p>
        )}

        {isLoading ? (
          <p className="loading-banner">Loading your recent books...</p>
        ) : (
          recentBooks.length > 0 ? (
            <div className="bookshelf">
              {recentBookLinks}
            </div>
          ) : (
            <div className="no-books-wrapper">
              <p className="no-books-message">
                No books added yet. Start by adding your first book!
              </p>
              <Link to="/bookentry" className="add-book-btn">
                + Add New Book
              </Link>
            </div>
          )
        )}
      </section>
    </main>
  );
}