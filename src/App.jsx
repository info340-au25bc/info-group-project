import React from 'react'; //import React Component

import NavBar from "./components/navbar";
import BookListing from './components/BookListing';
import JournallingPage from './components/JournallingPage';
import GoalsPage from './components/goaltracking';
import BookEntry from './components/bookEntry';
import BookDetails from './components/BookDetails';
import Footer from "./components/footer";
import { Routes, Route } from "react-router"

function App(props) {

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/allbooks" element={<BookListing />} />
        <Route path="/bookentry" element={<BookEntry />} />
        <Route path="/book/:bookId" element={<BookDetails />} />
        <Route path="/journal" element={<JournallingPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
