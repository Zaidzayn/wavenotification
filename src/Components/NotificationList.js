import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/notifications');
        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleStatusChange = async (id) => {
    const notification = notifications.find((notif) => notif.id === id);
    const updatedNotification = {
      ...notification,
      status: notification.status === 'Read' ? 'Unread' : 'Read',
    };

    try {
      const response = await fetch(`http://localhost:5000/notifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNotification),
      });

      if (!response.ok) {
        throw new Error(`Failed to update notification: ${response.status}`);
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? updatedNotification : notif
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notifications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete notification: ${response.status}`);
      }

      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Notification List</h2>
      {notifications.map((notif) => (
        <NotificationItem
          key={notif.id}
          notification={notif}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NotificationList;
