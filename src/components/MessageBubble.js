import React from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const MessageBubble = ({ msg }) => {
  const [user] = useAuthState(auth);
  console.log(msg.user);

  return (
    <div
      className={`chat-bubble ${msg.user === user.displayName ? 'right' : ''}`}
    >
      <div className="chat-bubble__right">
        <p className="user-name">{msg.user}</p>
        <p className="user-message">{msg.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
