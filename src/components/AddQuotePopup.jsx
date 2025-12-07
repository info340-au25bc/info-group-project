import React, { useState } from 'react';

export default function AddQuotePopup({ isOpen, onClose, onAddQuote }) {
  const [quoteText, setQuoteText] = useState('');

  if (!isOpen) {
    return null;
  }

  function clickAddButton() {
    const trimmedQuote = quoteText.trim();
    if (trimmedQuote) {
      onAddQuote(trimmedQuote);
      setQuoteText('');
      onClose();
    }
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="book-journal-box quote-popup" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={onClose}>×</div>
        <div className="reflection-question">Add your quote, highlight, or jot where you left off.</div>
        <div className="quote-subtitle">*Quotes and highlights save as cards in your Journal</div>
        <textarea 
          className="thoughts-area" 
          placeholder="Enter your quote or highlight here..."
          value={quoteText}
          onChange={(e) => setQuoteText(e.target.value)}
        ></textarea>
        <button className="add-quote-button" onClick={clickAddButton}>Add Quote</button>
      </div>
    </div>
  );
}
