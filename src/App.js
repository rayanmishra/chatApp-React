import './App.css';
import './App.css';
import NavBar from './components/NavBar';
import ChatRoom from './components/ChatRoom';
import Welcome from './components/Welcome';
import { useState } from 'react';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <NavBar />
      {!user ? <Welcome /> : <ChatRoom />}
    </div>
  );
}

export default App;
