import React, { useState } from 'react';

export default function AddQuotePopup({ isOpen, onClose, onAddQuote }) {
  const [quoteInput, setQuoteInput] = useState('');

  if (!isOpen) return null;

  function clickAddQuoteButton() {
    if (quoteInput.trim()) {
      onAddQuote(quoteInput);
      setQuoteInput('');
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
          value={quoteInput}
          onChange={(e) => setQuoteInput(e.target.value)}
        ></textarea>
        <button className="add-quote-button" onClick={clickAddQuoteButton}>Add Quote</button>
      </div>
    </div>
  );
}
