import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';

const ALL_TAG_OPTIONS = [
  'Inspirational',
  'Dark',
  'Emotional',
  'Uplifting',
  'Thought-provoking',
  'Suspenseful',
  'Heartwarming',
  'Adventurous'
];

export default function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState(null);
  const [editingMode, setEditingMode] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [notesText, setNotesText] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);

    setIsLoading(true);
    setErrorMessage('');

    const unsubscribe = onValue(
      bookRefInDatabase,
      (snapshot) => {
        const fbData = snapshot.val();

        if (fbData) {
          setBookInfo(fbData);
          setDescriptionText(fbData.description ?? '');
          setNotesText(fbData.notes ?? '');
          setDateInput(fbData.date ?? '');
          setSelectedTags(fbData.tags ?? []);
        } else {
          setBookInfo(null);
          setDescriptionText('');
          setNotesText('');
          setDateInput('');
          setSelectedTags([]);
        }

        setIsLoading(false);
      },
      () => {
        setErrorMessage('Failed to load this book. Please try again.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [bookId]);

  function handleDateChange(event) {
    const newDate = event.target.value;
    setDateInput(newDate);

    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);

    update(bookRefInDatabase, { date: newDate }).catch(() => {
      setErrorMessage('Could not update the date. Please try again.');
    });
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

    update(bookRefInDatabase, updatedData)
      .then(() => {
        setEditingMode(false);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Could not save your changes. Please try again.');
      });
  }

  function clickDeleteButton() {
    const database = getDatabase();
    const bookLocation = 'books/' + bookId;
    const bookRefInDatabase = ref(database, bookLocation);

    remove(bookRefInDatabase)
      .then(() => {
        navigate('/allbooks');
      })
      .catch(() => {
        setErrorMessage('Could not delete this book. Please try again.');
      });
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

  const tagButtons = ALL_TAG_OPTIONS.map(tag => {
    const isActive = selectedTags.includes(tag);
    const className = isActive ? 'tag-btn active' : 'tag-btn';

    return (
      <button
        key={tag}
        type="button"
        className={className}
        onClick={() => toggleTag(tag)}
      >
        {tag}
      </button>
    );
  });

  const tagBadges = selectedTags.map(tag => (
    <span key={tag} className={getTagClass(tag)}>{tag}</span>
  ));

  if (isLoading) {
    return (
      <main className="book-details">
        <p className="loading-banner">Loading...</p>
      </main>
    );
  }

  if (!bookInfo) {
    return <div>Loading...</div>;
  }

  return (
    <main className="book-details">
      {errorMessage && (
        <p className="error-banner">{errorMessage}</p>
      )}
      <div className="book-info">
        <button
          type="button"
          className="close-btn-details"
          onClick={() => navigate('/allbooks')}
          aria-label="Close and return to all books"
        >
          ×
        </button>
        <label htmlFor="dateInput">Select A Date:</label>
        <input
          id="dateInput"
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
              {tagButtons}
            </div>
          ) : (
            <div className="tags-display">
              {selectedTags.length > 0 ? (
                tagBadges
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