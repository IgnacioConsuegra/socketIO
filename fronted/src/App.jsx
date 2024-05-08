import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io("/");

function App(){
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const receiveMessage = (message) => 
  setMessages((state) => [...state, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from : 'Me'
    }
    setMessages(prev => [...prev, newMessage])
    socket.emit('message', message);
  }
  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);
  return(
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>Chat</h1>
        <input type="text" 
        placeholder='Write your message'
        value={message}
        className='border-2 border-zinc-500 p-2 w-full text-black'
        onChange={(ev) => setMessage(ev.target.value)}
        />
        <button>send</button>
        <ul className=''>
        {messages.map((element, index) => (
          <li key={index} className={
            `my-2 p-2 table text-sm rounded-md 
            ${element.from === 'Me'  ?'bg-sky-700' : 'bg-black ml-auto'  }
            `
          }>
            <span className='text-xs text-slate-500 font-bold block'>{element.from}</span>
            <span className='text-md'>{element.body}</span>
          </li>
        ))}
      </ul>
      </form>
    </div>
  )
}
export default App;
