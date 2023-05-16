import { auth, provider } from '../firebase';

import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from 'firebase/auth';

// Google sign in
const Welcome = () => {
  const googleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  // Guest sign in. Add Guest name to the profile of the guest for display purposes
  const guestSignin = async () => {
    const userCredential = await signInAnonymously(auth);
    const { user } = userCredential;
    const displayName = 'Guest';
    await updateProfile(user, { displayName });
  };

  return (
    <main>
      <div className="main">
        <h1 className="main__heading">Welcome to the Chat App</h1>
        <p className="main__body">
          Please Sign in with google to chat with your friends!
        </p>
        <button className="btn" onClick={googleSignIn}>
          Sign In With Google
        </button>
        <button className="btn" onClick={guestSignin}>
          Guest User
        </button>
      </div>
    </main>
  );
};

export default Welcome;
