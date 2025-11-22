import React from 'react';

export default function AddQuotePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="book-journal-box quote-popup" onClick={(e) => e.stopPropagation()}>
        <div className="close-btn" onClick={onClose}>×</div>
        <div className="reflection-question">Add your quote, highlight, or jot where you left off.</div>
        <div className="quote-subtitle">*Quotes and highlights save as cards in your Journal</div>
        <textarea className="thoughts-area" placeholder="Enter your quote or highlight here..."></textarea>
        <button className="add-quote-button">Add Quote</button>
      </div>
    </div>
  );
}
