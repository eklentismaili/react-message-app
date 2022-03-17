import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from 'firebase/firestore';
import User from '../components/User';
import Loading from '../components/Loading';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState({});
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState([]);

  const selectedUser = chat.uid;
  const ownUid = auth.currentUser.uid;

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

      setUsers(prev => (prev = users));
    });

    return () => unsub();
  }, [chat]);

  const selectUser = user => {
    setChat(prev => (prev = user));

    const id =
      ownUid > selectedUser
        ? `${ownUid + selectedUser}`
        : `${selectedUser + ownUid}`;

    const msgsRef = collection(db, 'messages', id, 'chat');

    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    onSnapshot(q, querySnapshot => {
      let msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push(doc.data());
      });

      setMsgs(prev => (prev = msgs));
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const id =
      ownUid > selectedUser
        ? `${ownUid + selectedUser}`
        : `${selectedUser + ownUid}`;

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: ownUid,
      to: selectedUser,
      createdAt: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: ownUid,
      to: selectedUser,
      createdAt: Timestamp.fromDate(new Date()),
      unread: true,
    });

    setText('');
  };

  if (!users) {
    return <Loading />;
  }

  return (
    <div className="container home-container">
      <div className="row">
        <div className="col-md-4 users-container">
          <h3>Chat</h3>
          <div className="users-tab">
            {users.map(user => (
              <User key={user.uid} user={user} selectedUser={selectUser} />
            ))}
          </div>
        </div>{' '}
        <div className="col-md-8 message-container">
          <div className="message-box">
            {Object.keys(chat).length !== 0 ? (
              <>
                <div className="message-user">
                  <h3>{chat.name}</h3>
                </div>
                <div className="messages">
                  {msgs.length
                    ? msgs.map((msg, i) => (
                        <Message key={msg.text + i} msg={msg} ownUid={ownUid} />
                      ))
                    : null}
                </div>
                <MessageForm
                  handleSubmit={handleSubmit}
                  text={text}
                  setText={setText}
                />
              </>
            ) : (
              <div className="no-conv">
                Select a user to start a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
