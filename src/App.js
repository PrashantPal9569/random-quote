import React, { useState, useEffect } from "react";

const API_URL = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

const App = () => {
  const [quote, setQuote] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setQuote(data[0]);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const saveQuote = () => {
    if (quote && !savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  const deleteQuote = (quoteToDelete) => {
    setSavedQuotes(
      savedQuotes.filter((savedQuote) => savedQuote !== quoteToDelete)
    );
  };

  return (
    <div className="app text-center font-sans bg-gray-100 p-5">
      <header className="header bg-gray-800 text-white p-5 text-center">
        <h1 className="text-2xl font-bold">Random Quote Generator</h1>
      </header>
      <div className="quote-card bg-white border border-gray-300 rounded-lg p-5 m-5 max-w-xl mx-auto shadow-md">
        <p className="text-lg mb-3">{quote}</p>
        <div className="two-button flex justify-center gap-2">
          <button
            onClick={fetchQuote}
            className="py-2 px-3 text-lg border-none rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          >
            New Quote
          </button>
          <button
            onClick={saveQuote}
            className="py-2 px-3 text-lg border-none rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-700"
          >
            Save Quote
          </button>
        </div>
      </div>
      <div className="saved-quotes max-w-xl mx-auto">
        <h2 className="text-xl mb-5">Saved Quotes</h2>
        {savedQuotes.map((savedQuote, index) => (
          <div
            key={index}
            className="saved-quote-card bg-white border border-gray-300 rounded-lg p-5 m-3 shadow-md flex justify-between items-center"
          >
            <p className="text-lg flex-grow text-left">{savedQuote}</p>
            <button
              onClick={() => deleteQuote(savedQuote)}
              className="py-2 px-3 text-lg border-none rounded bg-red-500 text-white cursor-pointer hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
