import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const MessageBubble = ({ msg }) => {
  const [user] = useAuthState(auth);

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
        </div>
        <p className="user-message">{msg.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
