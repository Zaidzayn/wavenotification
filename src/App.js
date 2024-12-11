import React, { useState, useEffect } from "react";
import "./App.css";
import { messaging, getToken, onMessage } from "./firebase"; // Import using named imports

function App() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Firebase Messaging Setup
  useEffect(() => {
    // Request permission for notifications
    getToken(messaging, { vapidKey: 'BBcOHiR0yZtzjAWNHwMapYTxVRzc4yBJ32LddL57WaEFcIzYlNYDcm-3hjJtp2UxXQkunYGHrX39wf8sfPpWW8I' })
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
        } else {
          console.log("No FCM token available.");
        }
      })
      .catch((err) => {
        console.error("Error getting permission or token:", err);
      });

    // Handle incoming messages
    onMessage(messaging, (payload) => {
      console.log("Notification received:", payload);
      const newNotification = {
        id: Date.now(),
        title: payload.notification.title,
        message: payload.notification.body,
        timestamp: new Date().toLocaleString(),
        status: "Unread",
      };
      setNotifications((prev) => [newNotification, ...prev]);
    });
  }, []);

  const sendNotification = () => {
    if (title && message) {
      const newNotification = {
        id: Date.now(),
        title,
        message,
        timestamp: new Date().toLocaleString(),
        status: "Unread",
      };
      setNotifications([newNotification, ...notifications]);
      setTitle("");
      setMessage("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, status: "Read" } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to Waves 2024</h1>
      </header>
      <main className="dashboard">
        {/* Send Notification Section */}
        <section className="send-section">
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
          ></textarea>
          <button onClick={sendNotification}>Send</button>
        </section>

        {/* Notifications Section */}
        <section className="notifications-section">
          <h2>Notifications</h2>
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id} className="notification-item">
                  <div>
                    <h3>{notif.title}</h3>
                    <p>{notif.message}</p>
                    <span>{notif.timestamp}</span>
                    <span>Status: {notif.status}</span>
                  </div>
                  <div>
                    <button onClick={() => markAsRead(notif.id)}>
                      Mark as Read
                    </button>
                    <button onClick={() => deleteNotification(notif.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
