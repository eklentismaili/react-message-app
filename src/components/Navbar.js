import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../providers/Auth';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import Img from '../assets/images/icons/myAvatar.svg';
import Logout from './Logout';

function Navbar() {
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate('/login');
  };

  return (
    <header>
      <nav className="container">
        <h3 className="home">
          <Link to="/">
            <Chat />
          </Link>
        </h3>
        <div className="navigation-links">
          {user ? (
            <>
              <Link to="/profile">
                <img src={Img} alt="profile" className="navigation-avatar" />
              </Link>
              <button className="logout-btn btn" onClick={handleSignOut}>
                <Logout />
              </button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
