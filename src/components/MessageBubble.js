import React from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const MessageBubble = ({ msg }) => {
  const [user] = useAuthState(auth);
  console.log(msg);

  return (
    <div className={`chat-bubble ${msg.uid === user.uid ? 'right' : ''}`}>
      <div className="chat-bubble__right">
        <p className="user-name">{msg.user}</p>
        <p className="user-message">{msg.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;

// msg.user === user.displayName
