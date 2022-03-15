import React from 'react';
import Attachment from './Attachment';

function MessageForm({ handleSubmit, text, setText }) {
  return (
    <form onSubmit={handleSubmit} className="message-form">
      {/* <label htmlFor="img">
        <Attachment />
      </label>

      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: 'none' }}
      /> */}
      <div>
        <input
          placeholder="Enter Message"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="form-control"
        />
      </div>
      <button className="send-message" disabled={!text.length}>
        Send
      </button>
    </form>
  );
}

export default MessageForm;
