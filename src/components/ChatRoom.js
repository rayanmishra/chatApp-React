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
  // Ref to scroll to the latest message
  const scroll = useRef();

  // State for the new message input being typed
  const [newMessage, setNewMessage] = useState('');
  // State to store the messages
  const [messages, setMessages] = useState([]);

  // State to track if a new message has been added
  const [newMessageAdded, setNewMessageAdded] = useState(false);
  // Ref to store the length of previous messages
  const prevMessagesLengthRef = useRef(0);

  // Reference to the 'messages' collection in the database
  const messageRef = collection(db, 'messages');

  // Fetch messages from the database when the component mounts
  useEffect(() => {
    const messageRef = collection(db, 'messages');
    // Set up the query to get the latest 50 messages, ordered by createdAt timestamp
    const queryMessages = query(messageRef, orderBy('createdAt'), limit(50));
    // Using onValue equivalent to fetch the latest database
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      // Create an empty array and populate it with message info and ID
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt,
        });
      });

      // Update the state with the messages array
      setMessages(messages);

      // Check if a new message has been added
      if (messages.length > prevMessagesLengthRef.current) {
        setNewMessageAdded(true);
      }

      // Update the length of previous messages
      prevMessagesLengthRef.current = messages.length;
    });

    // Cleaning up my useEffect during unmount
    return () => unsubscribe();
  }, []);

  // Scroll to the bottom of the message list whenever new messages are recieved
  useEffect(() => {
    if (newMessageAdded) {
      scroll.current?.scrollIntoView({ behavior: 'smooth' });
      // Reset the newMessageAdded state
      setNewMessageAdded(false);
    }
  }, [newMessageAdded]);

  // Add a new message to the database
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for empty message
    if (newMessage === '') return;

    // Create a new document using addDoc in the 'messages' collection with the message data
    // these properties contain text msg, when it was created, which user created it etc
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      uid: auth.currentUser.uid,
    });

    // Clear the input field
    setNewMessage('');
  };

  // Render the ChatRoom component
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
