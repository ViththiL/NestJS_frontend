const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Determine if we're running inside a pkg executable
const isPkg = typeof process.pkg !== 'undefined';

// Adjust the directory path for static files
const staticDir = isPkg ? path.join(path.dirname(process.execPath), 'public') : path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
