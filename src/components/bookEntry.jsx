import React, { useState } from 'react';

function BookEntry () {
    return (
            <section>
            <h2>Book Entry</h2>
            <div>
                <p><strong>Book Title:</strong> Enter Book Title</p>
            </div>
            
            <div>
                <p><strong>Author:</strong> Enter Author Name</p>
            </div>
            
            <div>
                <p><strong>Genre:</strong> Enter Genre</p>
            </div>
            
            <div>
                <p><strong>Reading Status:</strong> Enter Reading Status</p>
            </div>
            
            <div>
                <p><strong>Notes/Thoughts:</strong></p>
                <p>This is where thoughts and notes about the book would appear. Sample text showing how a reader might reflect on the book's themes, characters, or personal connections.</p>
            </div>
        </section>
    )
}

export default BookEntry;