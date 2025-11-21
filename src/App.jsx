import React from 'react'; //import React Component

import NavBar from "./components/navbar";
import BookListing from './components/BookListing';
import GoalsPage from './components/goaltracking';
import Footer from "./components/footer";
import { Routes, Route } from "react-router"

function App(props) {

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/allbooks" element={<BookListing />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
