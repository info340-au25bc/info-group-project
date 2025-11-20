import React from "react";

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

      {/* Image Section */}
      <section className="home-image">
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
          <div className="book" style={{ backgroundColor: "#947A61" }}>
            Placeholder
          </div>
          <div className="book" style={{ backgroundColor: "#969198" }}>
            Placeholder
          </div>
          <div className="book" style={{ backgroundColor: "#8C5B5E" }}>
            Placeholder
          </div>
          <div className="book" style={{ backgroundColor: "#947A61" }}>
            Placeholder
          </div>
          <div className="book" style={{ backgroundColor: "#373133" }}>
            Placeholder
          </div>
        </div>
      </section>
    </main>
  );
}