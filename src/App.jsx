import React from 'react'; //import React Component

import NavBar from "./components/navbar";
import GoalsPage from './components/goaltracking';
import Footer from "./components/footer";
import { Routes, Route } from "react-router"

function App(props) {

  return(
    <div>
      <NavBar />
      <Routes>
        <Route path="/goals" element={<GoalsPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
