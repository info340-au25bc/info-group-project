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
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);
    
    onValue(bookRefInDatabase, (snapshot) => {
      const fbData = snapshot.val();
      if (fbData) {
        setBookInfo(fbData);
        
        if (fbData.description) {
          setDescriptionText(fbData.description);
        } else {
          setDescriptionText('');
        }
        
        if (fbData.notes) {
          setNotesText(fbData.notes);
        } else {
          setNotesText('');
        }
        
        if (fbData.date) {
          setDateInput(fbData.date);
        } else {
          setDateInput('');
        }
        
        if (fbData.tags) {
          setSelectedTags(fbData.tags);
        } else {
          setSelectedTags([]);
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
      notes: notesText,
      tags: selectedTags
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
  
  function toggleTag(tag) {
    const tagExists = selectedTags.includes(tag);
    if (tagExists) {
      const newTags = selectedTags.filter(t => t !== tag);
      setSelectedTags(newTags);
    } else {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
    }
  }
  
  function getTagClass(tag) {
    const lowerTag = tag.toLowerCase();
    const cleanTag = lowerTag.replace(' ', '-');
    return 'tag-badge tag-' + cleanTag;
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
        <p className="book-author"><span className="label">Author:</span> <i>{bookInfo.author}</i></p>
        <p className="book-genre"><span className="label">Genre:</span> {bookInfo.genre || 'N/A'}</p>
        <p className="book-status"><span className="label">Status:</span> {bookInfo.status}</p>
        
        <div className="book-tags">
          <h3>Tags</h3>
          {editingMode ? (
            <div className="tags-selector">
              {['Inspirational', 'Dark', 'Emotional', 'Uplifting', 'Thought-provoking', 'Suspenseful', 'Heartwarming', 'Adventurous'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={selectedTags.includes(tag) ? 'tag-btn active' : 'tag-btn'}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : (
            <div className="tags-display">
              {selectedTags.length > 0 ? (
                selectedTags.map(tag => <span key={tag} className={getTagClass(tag)}>{tag}</span>)
              ) : (
                <p>No tags yet.</p>
              )}
            </div>
          )}
        </div>

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
