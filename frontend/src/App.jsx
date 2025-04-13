import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const getShortedLink = async () => {
    try {
      const res = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url})
      })
      const shortUrl = await res.json();
      setShortUrl(shortUrl)
      console.log(shortUrl)
    } catch (error) {
      console.error('unable to get the shorten url', error)
    }
  }
  return (
    <>
      <input type="text" placeholder='Enter a url' onChange={(e) => setUrl(e.target.value)}/>
      <button onClick={getShortedLink}>GET YOUR LINK</button>
      <p>{shortUrl}</p>
    </>
  )
}

export default App
