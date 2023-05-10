import { useEffect, useState } from 'react';
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

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Ref to the database
  const messageRef = collection(db, 'messages');

  // To recieve message
  useEffect(() => {
    const queryMessages = query(messageRef, orderBy('createdAt'), limit(50));
    const cleanUp = onSnapshot(queryMessages, (snapshot) => {
      // create an empty array and put all the info&id
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      // saving messages array in a state
      setMessages(messages);
    });
    // Cleaning up my useEffect
    return () => cleanUp();
  }, []);

  // To add message to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check for empty message
    if (newMessage === '') return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });

    setNewMessage('');
  };

  return (
    <main>
      <div className="chat__room">
        <div className="header">
          <h1>Welcome to the Chatroom</h1>
        </div>

        <div className="messages">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              <span className="user">{msg.user}:</span>
              {msg.text}
            </div>
          ))}
        </div>

        <form className="message__form" onSubmit={handleSubmit}>
          <label htmlFor="" hidden>
            Enter Message
          </label>
          <input
            className="message__input"
            type="text"
            placeholder="text message.."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button class="btn__send" type="submit">
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatRoom;

// addDoc just add a document to the collection(database)
// severTimestamp is to acquire the time when it was created
// onSnapshot is like onValue

// const ChatRoom = () => {
//   return (
//     <main>
//       <div>CHatroom</div>
//     </main>
//   );
// };

// export default ChatRoom;
