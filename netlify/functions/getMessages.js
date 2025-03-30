const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    // Fetch messages from Firestore
    const messagesSnapshot = await db.collection('messages').get();
    const messages = messagesSnapshot.docs.map(doc => doc.data());

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve messages.' }),
    };
  }
}; 