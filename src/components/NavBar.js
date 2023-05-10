import React from 'react';
import { auth, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup } from 'firebase/auth';
// Nav
const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = async () => {
    const result = await signInWithPopup(auth, provider);
  };

  const signUserOut = () => {
    auth.signOut();
  };
  // When user presses Sign in the button changes to Sign out
  return (
    <nav>
      <h1>React Chat</h1>

      {user ? (
        <button className="sign-out" onClick={signUserOut}>
          Sign Out
        </button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}
    </nav>
  );
};

export default NavBar;
