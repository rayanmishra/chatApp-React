import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import MessageEdit from './MessageEdit';
import { updateDoc, doc } from 'firebase/firestore';

const MessageBubble = ({ msg }) => {
  const [user] = useAuthState(auth);

  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const messageUpdate = async (id, text) => {
    const data = {
      text: text,
    };
    const messageRef = doc(db, 'messages', id);
    updateDoc(messageRef, data);
    setShowEdit(!showEdit);
  };

  let content;
  if (showEdit) {
    content = <MessageEdit msg={msg} onSubmit={messageUpdate} />;
  }

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
    <div className={`chat-bubble ${msg.uid === user.uid ? 'right' : ''}`}>
      <div className="chat-bubble__right">
        <div className="user__header">
          <p className="user-name">{msg.user}</p>
          <p className="user-time">{getDisplayTime()}</p>
          {msg.uid === user.uid ? (
            <button className="edit" onClick={handleEditClick}>
              edit
            </button>
          ) : null}
        </div>
        {showEdit ? content : <p className="user-message">{msg.text}</p>}
      </div>
    </div>
  );
};

export default MessageBubble;
