import { useEffect, useState, useRef } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import NavBar from './NavBar';
import MessageBubble from './MessageBubble';

const ChatRoom = () => {
  const scroll = useRef();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Ref to the database
  const messageRef = collection(db, 'messages');

  // To recieve message
  useEffect(() => {
    const messageRef = collection(db, 'messages');
    const queryMessages = query(messageRef, orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      // create an empty array and put all the info&id
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt,
        });
      });
      // saving messages array in a state
      scroll.current?.scrollIntoView({ behavior: 'smooth' });
      setMessages(messages);
    });

    // Cleaning up my useEffect
    return () => unsubscribe();
  }, []);

  // Scroll to the bottom of the message list
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // To add message to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check for empty message
    if (newMessage === '') return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
    });

    setNewMessage('');
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chatroom">
      <NavBar />
      <main>
        <div className="chat__room">
          <div className="header">
            <h2>Chatroom</h2>
          </div>

          <div className="messages">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
              // <div className="message" key={msg.id}>
              //   <span className="user">{msg.user}:</span>
              //   {msg.text}
              // </div>
            ))}
            <div ref={scroll}></div>
          </div>

          <form className="message__form" onSubmit={handleSubmit}>
            <label htmlFor="" hidden>
              Enter Message
            </label>
            <input
              className="message__input"
              type="text"
              placeholder="Type here.."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button className="btn__send" type="submit">
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;

// addDoc just add a document to the collection(database)
// severTimestamp is to acquire the time when it was created
// onSnapshot is like onValue
