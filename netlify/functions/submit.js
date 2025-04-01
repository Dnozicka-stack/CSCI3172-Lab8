const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Validation regex patterns
    const namePattern = /^[a-zA-ZÀ-ÿ' -]+$/; 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const messagePattern = /^[^<>]*$/; 
    const subjectPattern = /^[a-zA-Z\s]+$/; 

    // Validate input data
    if (!namePattern.test(data.name)) {
      throw new Error('Invalid name format.');
    }
    if (!emailPattern.test(data.email)) {
      throw new Error('Invalid email format.');
    }
    if (!messagePattern.test(data.message)) {
      throw new Error('Message contains invalid characters.');
    }
    if (!subjectPattern.test(data.subject)) {
      throw new Error('Subject contains invalid characters.');
    }

    // Sanitize the input data
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
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
      statusCode: 400,
      body: JSON.stringify({ message: error.message || 'Failed to submit form.' }),
    };
  }
}; 