import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import User from '../components/User';
import Loading from '../components/Loading';
function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, 'users');
    //collect query object
    const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));
    // execute query
    const unsub = onSnapshot(q, querySnapshot => {
      let users = [];
      querySnapshot.forEach(doc => {
        users.push(doc.data());
      });

      setUsers(users);
    });

    return () => unsub();
  }, []);

  console.log(users);

  if (!users) {
    return <Loading />;
  }

  const selectUser = user => {
    console.log(user);
  };

  return (
    <div className="home-container">
      <div className="users-container">
        {users.map(user => (
          <User key={user.uid} user={user} selectedUser={selectUser} />
        ))}
      </div>
    </div>
  );
}

export default Home;
