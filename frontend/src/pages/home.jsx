import { useState } from "react";

function Home(){
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
  
    const getShortedLink = async () => {
      try {
        const res = await fetch('http://localhost:5000/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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
            <button onClick={getShortedLink} className="bg-amber-400">GET YOUR LINK</button>
            <p>{shortUrl}</p>
        </>
      )
}

export default Home;