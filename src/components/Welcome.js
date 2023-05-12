import { auth, provider } from '../firebase';

import { signInWithPopup } from 'firebase/auth';

const Welcome = () => {
  const googleSignIn = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <main>
      <div className="main">
        <h1 className="main__heading">Welcome to the Chat App</h1>
        <p className="main__body">
          Please Sign in with google to chat with your friends!
        </p>
        <button className="btn" onClick={googleSignIn}>
          Sign In
        </button>
      </div>
    </main>
  );
};

export default Welcome;
