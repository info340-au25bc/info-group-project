import React from 'react'; //import React Component

import NavBar from "./components/Navbar";
import HomePage from './components/Home';
import BookListing from './components/BookListing';
<<<<<<< HEAD
import JournallingPage from './components/JournalingPage';
import GoalsPage from './components/goaltracking';
import BookEntry from './components/bookEntry';
=======
import JournalingPage from './components/JournalingPage';
import GoalsPage from './components/GoalTracking';
import BookEntry from './components/BookEntry';
>>>>>>> fc28468 (added calendar on goals tracking page for third image)
import BookDetails from './components/BookDetails';
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom"

function App(props) {

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allbooks" element={<BookListing />} />
        <Route path="/bookentry" element={<BookEntry />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/journal/:bookId" element={<JournalingPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
