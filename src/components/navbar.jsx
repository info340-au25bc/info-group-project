import React from 'react'; //import React Component

import { Link } from "react-router";
import { FaBars } from 'react-icons/fa6';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src="/img/BookBuddyLogo.png" alt="BookBuddy Logo" className="logo" />
        <Link to="/" className="site-title-link"><h1 className="site-title">BookBuddy</h1></Link>
      </div>
      <div className="nav-right">
        <input type="checkbox" id="menu-toggle"/>
      <label htmlFor="menu-toggle" id="hamburger" aria-label="Open Menu">
        <FaBars />
      </label>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allbooks">All Books</Link></li>
          <li><Link to="/goals">Goals</Link></li>
        </ul>
      </div>
    </nav>
  );
}