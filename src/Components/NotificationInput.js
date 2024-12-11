import React, { useState } from 'react';

const NotificationInput = ({ onSend }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    const notification = {
      title,
      message,
      timestamp: new Date().toISOString(),
      status: 'Unread',
    };

    try {
      const response = await fetch('http://localhost:5000/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      });

      if (response.ok) {
        const newNotification = await response.json();
        onSend(newNotification); // Notify parent to refresh notifications
        setTitle('');
        setMessage('');
      } else {
        console.error('Failed to send notification', response.statusText);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendNotification}>Send</button>
    </div>
  );
};

export default NotificationInput;
