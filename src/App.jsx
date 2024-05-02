import { useEffect, useState } from 'react';
import './App.css'


const App = () => {
  const [identifier, setIdentifier] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          api_key: 'NEYNAR_API_DOCS'
        }
      };

      const params = new URLSearchParams({
        identifier: identifier,
        type: 'url', // or 'hash' depending on your requirement
        reply_depth: 2,
        include_chronological_parent_casts: false
      });

      const url = `https://api.neynar.com/v2/farcaster/cast/conversation?${params}`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setReplies(data.conversation.cast.direct_replies);
        console.log(data.conversation.cast.direct_replies);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [identifier]);

  const handleInputChange = (event) => {
    setIdentifier(event.target.value);
  };

  const getRandomUsername = () => {
    if (replies.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * replies.length);
    return replies[randomIndex].author.username;
  };


  return (
    <div className='thecode'>
      <h1>Comment Randomizer</h1>
      <input type="text" value={identifier} onChange={handleInputChange} placeholder="Enter Identifier" />

      <div className="replies">
      {/* <ul>
        {replies.map((reply, index) => (
          <li key={index}>{`${reply.author.username} ---> ${reply.text}`}
          </li>

        ))}
      </ul>  */}
         <ul>
        <li>{getRandomUsername()}</li>
      </ul>
      
      </div>
    </div>
  );
};

export default App;
