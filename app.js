const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Path to the messages.json file
const messagesFilePath = path.join(__dirname, 'messages.json');

// Read the messages.json file synchronously at the server startup
let messages = {};

try {
  const data = fs.readFileSync(messagesFilePath, 'utf8');
  messages = JSON.parse(data);
} catch (err) {
  console.error("Error reading the messages.json file:", err);
}

// Route to handle "hello" in different languages
app.get('/hello', (req, res) => {
  const language = (req.query.language || '').toLowerCase();

  // Validate the language parameter
  if (!language) {
    return res.status(400).json({ error_message: 'Language parameter is missing' });
  }

  // Check if the language exists in the messages object
  if (messages[language]) {
    return res.status(200).json({ message: messages[language].message });
  } else {
    return res.status(404).json({ error_message: 'Language not found or unsupported' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
