import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Nav
const NavBar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = () => {
    auth.signOut();
  };

  // When user presses Sign in the button changes to Sign out
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
