import React from 'react';

const NotificationItem = ({ notification, onStatusChange, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{notification.title}</h3>
      <p>{notification.message}</p>
      <small>{new Date(notification.timestamp).toLocaleString()}</small>
      <div>
        <button onClick={() => onStatusChange(notification.id)}>
          Mark as {notification.status === 'Read' ? 'Unread' : 'Read'}
        </button>
        <button onClick={() => onDelete(notification.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NotificationItem;
