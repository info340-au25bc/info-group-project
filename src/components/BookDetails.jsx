import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [dateInput, setDateInput] = useState('');

  useEffect(() => {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);
    
    onValue(bookRefInDatabase, (snapshot) => {
      const dataFromFirebase = snapshot.val();
      if (dataFromFirebase) {
        setBookInfo(dataFromFirebase);
        
        if (dataFromFirebase.description) {
          setDescriptionText(dataFromFirebase.description);
        } else {
          setDescriptionText('');
        }
        
        if (dataFromFirebase.notes) {
          setNotesText(dataFromFirebase.notes);
        } else {
          setNotesText('');
        }
        
        if (dataFromFirebase.date) {
          setDateInput(dataFromFirebase.date);
        } else {
          setDateInput('');
        }
      }
    });
  }, [bookId]);

  function handleDateChange(event) {
    const newDate = event.target.value;
    setDateInput(newDate);
    
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);
    update(bookRefInDatabase, { date: newDate });
  }

  function clickEditButton() {
    setEditingMode(true);
  }

  function clickSaveButton() {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);
    
    const updatedData = {
      description: descriptionText,
      notes: notesText
    };
    
    update(bookRefInDatabase, updatedData);
    setEditingMode(false);
  }

  function clickDeleteButton() {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);
    remove(bookRefInDatabase);
    navigate('/allbooks');
  }

  function clickJournalButton() {
    navigate('/journal/' + bookId);
  }

  if (!bookInfo) {
    return <div>Loading...</div>;
  }

  return (
    <main className="book-details">
      <div className="book-info">
        <button className="close-btn-details" onClick={() => navigate('/allbooks')}>×</button>
        <input 
          type="date" 
          className="date-input" 
          value={dateInput}
          onChange={handleDateChange}
        />
        <h2 className="book-title">{bookInfo.title}</h2>
        <p className="book-author"><i>{bookInfo.author}</i></p>
        <p className="book-genre"><strong>Genre:</strong> {bookInfo.genre || 'N/A'}</p>
        <p className="book-status"><strong>Status:</strong> {bookInfo.status}</p>

        <div className="book-description">
          <h3>Description</h3>
          {editingMode ? (
            <textarea 
              className="thoughts-area"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              placeholder="Add a description..."
            />
          ) : (
            <p>{bookInfo.description || 'No description yet.'}</p>
          )}
        </div>

        <div className="book-notes">
          <h3>Notes</h3>
          {editingMode ? (
            <textarea 
              className="thoughts-area"
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Add your notes..."
            />
          ) : (
            <p>{bookInfo.notes || 'No notes yet.'}</p>
          )}
        </div>

        <div className="book-actions">
          <div className="primary-actions">
            {editingMode ? (
              <button className="edit-btn" onClick={clickSaveButton}>Save</button>
            ) : (
              <button className="edit-btn" onClick={clickEditButton}>Edit Book</button>
            )}
            <button className="journal-btn" onClick={clickJournalButton}>Journal</button>
          </div>
          <button className="delete-btn" onClick={clickDeleteButton}>Delete</button>
        </div>
      </div>
    </main>
  );
}
