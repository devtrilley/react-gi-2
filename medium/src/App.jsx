/* Psuedocode 
  - Step 1: Set up the React app and install necessary dependencies.
  - Step 2: Set up React Router for navigation between pages.
  - Step 3: Fetch movie data using TMDB API 
  - Step 4: display the results.
  - Step 5: Display the movie detail page.
  - Step 6: CSS stylings
*/

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Root for Home Page */}
        <Route path="/" element={<Home />} /> 

        {/* Root for Movie Search Page using dynamical route */}
        <Route path="/movies/:id" element={<Movies />} /> 
      </Routes>
    </Router>
  );
}

export default App;
