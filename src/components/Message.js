import { useRef, useEffect } from 'react';
import Moment from 'react-moment';

function Message({ msg, ownUid }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
  }, [msg]);

  return (
    <div
      className={`message-wrapper ${msg.from === ownUid ? 'own' : ''}`}
      ref={scrollRef}
    >
      <p
        className={`message-text ${
          msg.from === ownUid ? 'own-text' : 'friend-text'
        }`}
      >
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
}

export default Message;
