import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/navbar";
import { messaging, getToken, onMessage } from "./firebase";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");

  // Firebase Messaging Setup
  useEffect(() => {
    getToken(messaging, {
      vapidKey: "BBcOHiR0yZtzjAWNHwMapYTxVRzc4yBJ32LddL57WaEFcIzYlNYDcm-3hjJtp2UxXQkunYGHrX39wf8sfPpWW8I",
    })
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
        title: payload.notification?.title || "No Title",
        message: payload.notification?.body || "No Message",
        timestamp: new Date().toLocaleString(),
        status: "Unread",
      };
      setNotifications((prev) => [newNotification, ...prev]);
    });
  }, []);

  const sendNotification = () => {
    if (title && message && category) {
      const newNotification = {
        id: Date.now(),
        title,
        message,
        category,
        timestamp: new Date().toLocaleString(),
        status: "Unread",
      };
      setNotifications([newNotification, ...notifications]);
      setTitle("");
      setMessage("");
      setCategory("");
    } else {
      alert("Please fill out all fields.");
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
      {/* Navigation Bar */}
      <NavBar />

      <h1 className="dashboard-title">Notification Dashboard</h1>
      <main className="dashboard">
        {/* Send Notification Section */}
        <section className="send-section">
          <div className="send-header">
            <h2>Send Notification</h2>
            <div className="dropdown">
              <label htmlFor="category"></label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Important">Important</option>
                <option value="News">News</option>
                <option value="Update">Update</option>
              </select>
            </div>
          </div>

          <div className="form-container">
            <div className="input-group">
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
            </div>
          </div>
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
                    <span>Category: {notif.category}</span>
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
