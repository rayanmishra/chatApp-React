import { auth, db } from '../firebase';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import MessageEdit from './MessageEdit';
import { updateDoc, doc } from 'firebase/firestore';

const MessageBubble = ({ msg }) => {
  console.log(msg.createdAt);
  // Getting the authenticated user using the 'useAuthState' hook
  const [user] = useAuthState(auth);
  // Setting up a state to manage whether the edit message is visible or not
  const [showEdit, setShowEdit] = useState(false);

  // Event handler for clicking the edit button
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  // Function to update the messages content in the database
  const messageUpdate = async (id, text) => {
    const data = {
      text: text,
    };
    const messageRef = doc(db, 'messages', id);
    updateDoc(messageRef, data);

    setShowEdit(!showEdit);
  };

  // Conditionally rendering the MessageEdit component if 'showEdit' is true
  let content;
  if (showEdit) {
    content = <MessageEdit msg={msg} onSubmit={messageUpdate} />;
  }

  // Function to convert the message creation time to a formatted time string since firestore gives me time in seconds and milliseconds
  function timeConvert(time) {
    const milliseconds = time?.seconds * 1000 + time?.nanoseconds / 1000000;
    const createdAtDate = new Date(milliseconds);
    const options = {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      milliseconds: false,
    };

    const formattedTime = createdAtDate.toLocaleTimeString([], options);

    return formattedTime;
  }

  // Function to get the display time for the message (Just now for latest message and Normal time for the older messages)
  function getDisplayTime() {
    if (!msg.createdAt) {
      return 'Just now';
    }
    const diff = (Date.now() - msg.createdAt.toMillis()) / 1000;
    if (diff < 30) {
      return 'Just now';
    }
    return timeConvert(msg.createdAt);
  }

  return (
    <div className={`chat__bubble ${msg.uid === user.uid ? 'right' : ''}`}>
      <div className="chat__bubble__right">
        <div className="user__header">
          <p className="user__name">{msg.user}</p>
          <p className="user__time">{getDisplayTime()}</p>
          {msg.uid === user.uid ? (
            <button className="edit" onClick={handleEditClick}>
              edit
            </button>
          ) : null}
        </div>
        {showEdit ? content : <p className="user__message">{msg.text}</p>}
      </div>
    </div>
  );
};

export default MessageBubble;
