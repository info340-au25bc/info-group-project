import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function BookEntry () {
    const navigate = useNavigate();
    
    // form state
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [readingStatus, setReadingStatus] = useState('');

    const entrySubmit = (event) => {
        event.preventDefault();
        
        // new book object from  data
        const newBook = {
            id: Date.now(), // ID
            title: bookTitle,
            author: author,
            genre: genre,
            status: readingStatus,
            color: '#8C5B5E'
        };
        
        // this would be saved to a database or global state
        console.log('New book added:', newBook);
        navigate('/allbooks');
    };

    return (
        <main className="book-entry-page">
            <section className="book-entry-header">
                <h1 className="book-entry-title">Add a New <span>Book</span></h1>
                <p className="book-entry-subtitle">Share your next great read with your collection.</p>
            </section>
            
            <form className="book-entry-form" onSubmit={entrySubmit}>
                <div className="form-group">
                    <label htmlFor="book-title">Book Title: <span className="required">*</span></label>
                    <input 
                        type="text" 
                        id="book-title" 
                        placeholder="Enter Book Title" 
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        id="author" 
                        placeholder="Enter Author Name" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input 
                        type="text" 
                        id="genre" 
                        placeholder="Enter Genre" 
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="reading-status">Reading Status: <span className="required">*</span></label>
                    <select 
                        id="reading-status" 
                        value={readingStatus}
                        onChange={(e) => setReadingStatus(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="reading">Currently Reading</option>
                        <option value="completed">Completed</option>
                        <option value="want-to-read">Want to Read</option>
                    </select>
                </div>
                
                <button type="submit">Add Book</button>
            </form>
        </main>
    )
}

export default BookEntry;