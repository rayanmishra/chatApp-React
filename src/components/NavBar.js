import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Nav
const NavBar = () => {
  // Using the 'useAuthState' to get the authenticated user state from the 'auth' object
  const [user] = useAuthState(auth);

  // Calling the 'signOut' method from the 'auth' object to sign the user out
  const signUserOut = () => {
    auth.signOut();
  };

  // When user presses Sign in, the button changes to Sign out
  return (
    <nav>
      {user.displayName === null ? (
        <p className="nav__text">Welcome, Guest</p>
      ) : (
        <p className="nav__text">Welcome, {user.displayName}</p>
      )}

      <button className="sign-out" onClick={signUserOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default NavBar;
