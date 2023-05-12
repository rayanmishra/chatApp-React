import React from 'react';
import { auth, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup } from 'firebase/auth';
// Nav
const NavBar = () => {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  const signUserOut = () => {
    auth.signOut();
  };
  // When user presses Sign in the button changes to Sign out
  return (
    <nav>
      <p className="nav__text">Welcome, {user.displayName}</p>

      <button className="sign-out" onClick={signUserOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default NavBar;
