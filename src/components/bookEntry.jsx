import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function BookEntry () {
    const navigate = useNavigate();
    
    // state for form
    const [bookTitleInput, setBookTitleInput] = useState('');
    const [authorInput, setAuthorInput] = useState('');
    const [genreInput, setGenreInput] = useState('');
    const [statusInput, setStatusInput] = useState('');

    function handleFormSubmit(event) {
        event.preventDefault();
        
        // new book from data
        const newBookData = {
            id: Date.now(),
            title: bookTitleInput,
            author: authorInput,
            genre: genreInput,
            status: statusInput,
            color: '#8C5B5E'
        };
        
        // this would be saved to a database or global state
        console.log('New book added:', newBookData);
        navigate('/allbooks');
    }

    return (
        <main className="book-entry-page">
            <section className="book-entry-header">
                <h1 className="book-entry-title">Add a New <span>Book</span></h1>
                <p className="book-entry-subtitle">Share your next great read with your collection.</p>
            </section>
            
            <form className="book-entry-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="book-title">Book Title: <span className="required">*</span></label>
                    <input 
                        type="text" 
                        id="book-title" 
                        placeholder="Enter Book Title" 
                        value={bookTitleInput}
                        onChange={(e) => setBookTitleInput(e.target.value)}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text" 
                        id="author" 
                        placeholder="Enter Author Name" 
                        value={authorInput}
                        onChange={(e) => setAuthorInput(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input 
                        type="text" 
                        id="genre" 
                        placeholder="Enter Genre" 
                        value={genreInput}
                        onChange={(e) => setGenreInput(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="reading-status">Reading Status: <span className="required">*</span></label>
                    <select 
                        id="reading-status" 
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value)}
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