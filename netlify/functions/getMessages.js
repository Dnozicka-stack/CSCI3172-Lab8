const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    const filePath = path.join(__dirname, 'messages.json');

    // Read existing messages
    let messages = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      messages = JSON.parse(fileData);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(messages),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve messages.' }),
    };
  }
}; 