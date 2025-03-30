const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    const filePath = path.join(__dirname, 'messages.json');

    // Read existing messages
    let messages = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(fileData);
    }

    // Add new message
    messages.push(data);

    // Write updated messages back to the file
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

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