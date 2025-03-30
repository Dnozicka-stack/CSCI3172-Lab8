import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Sanitize the input data
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
    };

    // Add new message to Firestore
    const docRef = db.collection('messages').doc();
    await docRef.set(sanitizedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully!' }),
    };
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to submit form.' }),
    };
  }
}; 