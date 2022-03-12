import React from 'react';
import Img from '../assets/images/icons/profile.png';

function User({ user, selectedUser }) {
  return (
    <div className="user-wrapper" onClick={() => selectedUser(user)}>
      <div className="user-info">
        <div className="user-detail">
          <img src={user.avatar || Img} alt="avatar" className="avatar" />
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user-status ${
            user.isOnline ? 'user-status-online' : 'user-status-offline'
          }`}
        />
      </div>
    </div>
  );
}

export default User;
