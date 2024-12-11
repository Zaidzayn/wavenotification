

// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyAhc2_6BmwWFl-FrxAehIUZqwUZuyllQRQ",
    authDomain: "push-notification-635ff.firebaseapp.com",
    projectId: "push-notification-635ff",
    storageBucket: "push-notification-635ff.firebasestorage.app",
    messagingSenderId: "327982359654",
    appId: "1:327982359654:web:4e7ad69a781303fee239a7"
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
