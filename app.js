const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const messagesFilePath = path.join(__dirname, 'messages.json');

let messages = {};

fs.readFile(messagesFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the messages.json file:", err);
  } else {
    messages = JSON.parse(data);
  }
});

app.get('/hello', (req, res) => {
  const language = (req.query.language || '').toLowerCase();

  if (messages[language]) {
    res.status(200).json({ message: messages[language].message });
  } else {
    res.status(404).json({ error_message: 'Language not found or unsupported' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
