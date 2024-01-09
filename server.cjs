const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the base path for static files
const basePath = process.pkg ? path.dirname(process.execPath) : __dirname;

// Serve static files from the 'public' directory
app.use(express.static(path.join(basePath, 'public')));

// Handle all requests by sending the 'index.html' file
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
