import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import AddQuotePopup from './AddQuotePopup';

function StarRating({ rating, onRatingChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  function clickStar(starValue) {
    if (rating === starValue) {
      onRatingChange(0);
    } else if (rating === starValue - 0.5) {
      onRatingChange(starValue);
    } else {
      onRatingChange(starValue - 0.5);
    }
  }

  function getStarFill(starNumber) {
    const displayRating = hoverRating || rating;
    if (displayRating >= starNumber) {
      return '#ffdc19ff';
    } else if (displayRating >= starNumber - 0.5) {
      return 'url(#halfFill)';
    } else {
      return 'white';
    }
  }

  return (
    <div className="rating-section">
      <span className="star-rating">Rating: {rating}/5</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="212" height="44" viewBox="0 0 212 44" fill="none">
        <defs>
          <linearGradient id="halfFill">
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="white" />
          </linearGradient>
          <filter id="filter0_d_38_103" x="0" y="0" width="211.71" height="43.2758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_103"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_103" result="shape"/>
          </filter>
        </defs>
        <g filter="url(#filter0_d_38_103)" onMouseLeave={() => setStarHover(0)}>
          <path d="M22.0701 0L26.3358 13.4742H40.1402L28.9722 21.8017L33.238 35.2758L22.0701 26.9483L10.9022 35.2758L15.1679 21.8017L4 13.4742H17.8043L22.0701 0Z" fill={getStarColor(1)} onClick={() => clickStarButton(1)} onMouseEnter={() => setStarHover(1)} style={{ cursor: 'pointer' }} />
          <path d="M64.5 0L68.766 13.4742H82.57L71.402 21.8017L75.668 35.2758L64.5 26.9483L53.3321 35.2758L57.5978 21.8017L46.4299 13.4742H60.234L64.5 0Z" fill={getStarColor(2)} onClick={() => clickStarButton(2)} onMouseEnter={() => setStarHover(2)} style={{ cursor: 'pointer' }} />
          <path d="M106.5 0L110.766 13.4742H124.57L113.402 21.8017L117.668 35.2758L106.5 26.9483L95.3321 35.2758L99.5978 21.8017L88.4299 13.4742H102.234L106.5 0Z" fill={getStarColor(3)} onClick={() => clickStarButton(3)} onMouseEnter={() => setStarHover(3)} style={{ cursor: 'pointer' }} />
          <path d="M147.5 0L151.766 13.4742H165.57L154.402 21.8017L158.668 35.2758L147.5 26.9483L136.332 35.2758L140.598 21.8017L129.43 13.4742H143.234L147.5 0Z" fill={getStarColor(4)} onClick={() => clickStarButton(4)} onMouseEnter={() => setStarHover(4)} style={{ cursor: 'pointer' }} />
          <path d="M189.64 0L193.906 13.4742H207.71L196.542 21.8017L200.808 35.2758L189.64 26.9483L178.472 35.2758L182.738 21.8017L171.57 13.4742H185.374L189.64 0Z" fill={getStarColor(5)} onClick={() => clickStarButton(5)} onMouseEnter={() => setStarHover(5)} style={{ cursor: 'pointer' }} />
          <path d="M25.8594 13.625L25.9697 13.9746H38.6318L28.6738 21.4004L28.3887 21.6133L28.4951 21.9521L32.293 33.9473L22.3691 26.5479L22.0703 26.3242L21.7715 26.5479L11.8467 33.9473L15.6445 21.9521L15.752 21.6133L15.4668 21.4004L5.50781 13.9746H18.1709L18.2812 13.625L22.0703 1.65625L25.8594 13.625ZM68.2891 13.625L68.3994 13.9746H81.0615L71.1035 21.4004L70.8184 21.6133L70.9248 21.9521L74.7227 33.9473L64.7988 26.5479L64.5 26.3242L64.2012 26.5479L54.2764 33.9473L58.0742 21.9521L58.1816 21.6133L57.8965 21.4004L47.9375 13.9746H60.6006L60.7109 13.625L64.5 1.65625L68.2891 13.625ZM110.289 13.625L110.399 13.9746H123.062L113.104 21.4004L112.818 21.6133L112.926 21.9521L116.723 33.9473L106.799 26.5479L106.5 26.3242L106.201 26.5479L96.2764 33.9473L100.074 21.9521L100.182 21.6133L99.8965 21.4004L89.9375 13.9746H102.601L102.711 13.625L106.5 1.65625L110.289 13.625ZM151.289 13.625L151.399 13.9746H164.062L154.104 21.4004L153.818 21.6133L153.926 21.9521L157.723 33.9473L147.799 26.5479L147.5 26.3242L147.201 26.5479L137.276 33.9473L141.074 21.9521L141.182 21.6133L140.896 21.4004L130.938 13.9746H143.601L143.711 13.625L147.5 1.65625L151.289 13.625ZM193.43 13.625L193.54 13.9746H206.202L196.243 21.4004L195.958 21.6133L196.065 21.9521L199.862 33.9463L189.939 26.5479L189.641 26.3242L189.341 26.5479L179.417 33.9463L183.215 21.9521L183.322 21.6133L183.037 21.4004L173.078 13.9746H185.74L185.851 13.625L189.64 1.65723L193.43 13.625Z" stroke="black"/>
        </g>
      </svg>
    </div>
  );
}

export default function JournallingPage() {
  const { bookId } = useParams();
  const [isQuotePopupOpen, setIsQuotePopupOpen] = useState(false);
  const [allQuotes, setAllQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [bookTitle, setBookTitle] = useState('');
  const [bookRating, setBookRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (bookId) {
      const database = getDatabase();
      const bookLocation = 'books/' + bookId;
      const bookRefInDatabase = ref(database, bookLocation);
      
      onValue(bookInDatabase, (snapshot) => {
        const bookData = snapshot.val();
        if (bookData) {
          setTheBookTitle(bookData.title);
          if (bookData.rating) {
            setStarsRating(bookData.rating);
          }
        }
      });
    }
  }, [bookId]);

  function changeRating(newRating) {
    setStarsRating(newRating);
    const myDatabase = getDatabase();
    const whereBookIs = 'books/' + bookId;
    const bookInDatabase = ref(myDatabase, whereBookIs);
    update(bookInDatabase, { rating: newRating });
  }

  function addQuote(quoteText) {
    if (quotesList.length < 2) {
      const quote = {
        id: Date.now(),
        text: quoteText
      };
      setQuotesList([...quotesList, quote]);
    }
  }

  function openQuote(quote) {
    setClickedQuote(quote);
  }

  function deleteQuote() {
    const newQuotesList = [];
    for (let i = 0; i < quotesList.length; i++) {
      if (quotesList[i].id !== clickedQuote.id) {
        newQuotesList.push(quotesList[i]);
      }
    }
    setQuotesList(newQuotesList);
    setClickedQuote(null);
  }

  return (
    <main className="journal-page">
      <div className="book-journal-box">
        <div className="close-btn" onClick={() => navigate('/allbooks')}>×</div>
        
        <div className="book-title">{bookTitle || 'Loading...'}</div>
        
        <div className="rating-quotes-row">
          <StarRating rating={starsRating} onRatingChange={changeRating} />
          
          <div className="quotes-section">
            <button 
              className="quote-btn"
              onClick={() => setShowQuotePopup(true)}
              style={{ cursor: 'pointer' }}
              disabled={quotesList.length >= 2}
            >
              + Add a quote or highlight
            </button>
            <div className="quote-boxes-container">
              {quotesList.map((quote) => (
                <div 
                  key={quote.id} 
                  className="quote-box1"
                  onClick={() => openQuote(quote)}
                  style={{ cursor: 'pointer' }}
                >
                  "{quote.text}"
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="reflection-question">What stood out? Reflect overall</div>
        <textarea className="thoughts-area" placeholder="Write your thoughts..."></textarea>
        <button className="add-book-button">Save Journal</button>
      </div>

      <AddQuotePopup 
        isOpen={showQuotePopup} 
        onClose={() => setShowQuotePopup(false)}
        onAddQuote={addQuote}
      />

      {clickedQuote && (
        <div className="popup-overlay" onClick={() => setClickedQuote(null)}>
          <div className="book-journal-box quote-popup" onClick={(e) => e.stopPropagation()}>
            <div className="close-btn" onClick={() => setClickedQuote(null)}>×</div>
            <div className="reflection-question">Quote Details</div>
            <div className="thoughts-area" style={{ whiteSpace: 'pre-wrap', padding: '1rem' }}>
              "{clickedQuote.text}"
            </div>
            <button className="delete-book-button" onClick={deleteQuote}>Delete Quote</button>
          </div>
        </div>
      )}
    </main>
  );
}
