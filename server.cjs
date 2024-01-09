const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Check if running inside the pkg executable
const isPkg = typeof process.pkg !== 'undefined';

// Set the base directory for static files
const baseDir = isPkg ? path.join(path.dirname(process.execPath), 'snapshot', process.cwd()) : __dirname;

// Serve static files
app.use(express.static(path.join(baseDir, 'public')));

// Send index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(baseDir, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
