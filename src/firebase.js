
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAhc2_6BmwWFl-FrxAehIUZqwUZuyllQRQ",
  authDomain: "push-notification-635ff.firebaseapp.com",
  projectId: "push-notification-635ff",
  storageBucket: "push-notification-635ff.firebasestorage.app",
  messagingSenderId: "327982359654",
  appId: "1:327982359654:web:4e7ad69a781303fee239a7"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };