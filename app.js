const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const messagesFilePath = path.join(__dirname, 'messages.json');

let messages = {};

try {
  const data = fs.readFileSync(messagesFilePath, 'utf8');
  messages = JSON.parse(data);
} catch (err) {
  console.error("Error reading the messages.json file:", err);
}

app.get('/hello', (req, res) => {
  const language = (req.query.language || '').toLowerCase();

  if (!language) {
    return res.status(400).send('Language parameter is missing'); 
  }

  if (messages[language]) {
    return res.status(200).send(messages[language].message); 
  } else {
    return res.status(404).send('Language not found or unsupported'); 
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
