import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function HomePage() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const allBooksRef = ref(database, 'books');

    onValue(allBooksRef, (snapshot) => {
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
        
        // Get the 5 most recent books (last 5 added)
        const mostRecent = bookArray.slice(-5);
        setRecentBooks(mostRecent);
      } else {
        setRecentBooks([]);
      }
    });
  }, []);

  return (
    <main className="home-main">
      {/* Banner Section */}
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
        <img
          src="img/bookshelf.jpg"
          alt="Bookshelf illustration"
          className="center-image"
        />
      </section>

      {/* Recently Added Books */}
      <section className="home-shelf">
        <h2 className="shelf-heading">Recently Added Books</h2>

        <div className="bookshelf">
          {recentBooks.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="book-card-link">
              <div className="book" style={{ backgroundColor: book.color }}>
                {book.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}