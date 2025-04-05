import { useState } from 'react';
import './App.css';
import BookList from './BookList';
import CategoryFilter from './categoryFilter';
import WelcomeBand from './WelcomeBand';
import React from 'react';

function App() {
  const [selectedCat, setSelectedCat] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCat={selectedCat} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
