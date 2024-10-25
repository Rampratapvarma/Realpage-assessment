import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  
  const handleError = (message) => {
    setError(message);
    setLoading(false);
  };

  // Function to fetch last chapter summary based on book ID
  const fetchLastChapterSummary = async (bookId) => {
    try {
      // Fetch chapters for the book
      const chaptersResponse = await fetch(`https://api.potterdb.com/v1/books/${bookId}/chapters`);
      if (!chaptersResponse.ok) {
        throw new Error('Failed to fetch chapters');
      }

      const chaptersData = await chaptersResponse.json();
      const chapters = chaptersData.data;

      // Fetch only the last chapter
      if (chapters.length > 0) {
        const lastChapterId = chapters[chapters.length - 1].id;
        const lastChapterResponse = await fetch(`https://api.potterdb.com/v1/books/${bookId}/chapters/${lastChapterId}`);
        
        if (!lastChapterResponse.ok) {
          throw new Error('Failed to fetch last chapter');
        }

        const lastChapterData = await lastChapterResponse.json();
        setData(lastChapterData.data.attributes.summary);
        console.log(lastChapterData.data.attributes.summary)
      } else {
        handleError('No chapters found');
      }
    } catch (error) {
      handleError(`Error fetching chapters: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch book and trigger last chapter fetch
  const fetchBookData = async () => {
    try {
      const response = await fetch('https://api.potterdb.com/v1/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const booksData = await response.json();
      const firstBookId = booksData.data[0].id;

      if (firstBookId) {
        fetchLastChapterSummary(firstBookId);
      } else {
        handleError('No books found');
      }
    } catch (error) {
      handleError(`Error fetching books: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  return (
    <div className="App">
      <h1>Data Fetched:</h1>
      <h2>{loading ? 'Loading...' : error ? error : data}</h2>
    </div>
  );
}

export default App;
