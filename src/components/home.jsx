import React from "react";
import { Link } from 'react-router';

export default function HomePage() {
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
        <Link to={`/book/1`} className="book-card-link">
          <div className="book" style={{ backgroundColor: "#947A61" }}>
            Placeholder
          </div>
        </Link>
        <Link to={`/book/2`} className="book-card-link">
          <div className="book" style={{ backgroundColor: "#969198" }}>
            Placeholder
          </div>
        </Link>
        <Link to={`/book/3`} className="book-card-link">
          <div className="book" style={{ backgroundColor: "#8C5B5E" }}>
            Placeholder
          </div>
        </Link>
        <Link to={`/book/4`} className="book-card-link">
          <div className="book" style={{ backgroundColor: "#947A61" }}>
            Placeholder
          </div>
        </Link>
        <Link to={`/book/5`} className="book-card-link">
          <div className="book" style={{ backgroundColor: "#373133" }}>
            Placeholder
          </div>
        </Link>
        </div>
      </section>
    </main>
  );
}