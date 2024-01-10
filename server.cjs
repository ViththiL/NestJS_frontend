const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const isRunningInPkg = typeof process.pkg !== 'undefined';

// Adjust the path to serve files from the correct directory
const publicPath = isRunningInPkg
  ? path.join(path.dirname(process.execPath), 'public')
  : path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');

  fs.readFile(indexPath, 'utf8', (err, content) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Error loading index.html');
    }

    res.send(content);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
