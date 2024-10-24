import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 
  const [htmlmsg,setHtmlmsg]=useState(false)
  const [loading,setLoading]=useState(true)
 
  useEffect(() => {
    fetch('https://docs.potterdb.com/apis/rest')
      .then((res) => {
        // Check if the response is JSON
        if (res.ok && res.headers.get('content-type').includes('application/json')) {
          return res.json(); // Parse JSON response
        } else if (res.ok) {
          setHtmlmsg(true)
          return res.text(); // Handle non-JSON content (like HTML)
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`); // Handle HTTP errors
        }
      })
      .then((resp) => {
        if (!resp || resp.length === 0) {
          throw new Error('No data available'); // Handle empty response
        }
       console.log('Response:', resp);
        setData(resp); // Store data in state if valid
      })
      .catch((err) => {
        console.error('There was a problem with the fetch operation:', err);
        setError(err.message); // Store error message
      }).finally(()=>{
        setLoading(false)
      })
  }, []);

  return (
    <div className="App">
    {htmlmsg? (<><h1>Received HTMl text instead of JSON object so couldn't fetch books </h1>
    <h1>check the console to see the html response</h1>
    </>):
    (
    <>
    <h1>Data Fetched:</h1>
    <h2>{loading? "loading.......":error ? "Error : " + error : JSON.stringify(data)}</h2>
    </>)
}
  </div>
 
  );
}

export default App;
  