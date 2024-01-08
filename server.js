const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to resolve paths correctly after packaging
function resolvePath(relativePath) {
  if (process.pkg) {
    // If running from the pkg executable, the path is resolved differently
    return path.join(path.dirname(process.execPath), relativePath);
  }
  return path.join(__dirname, relativePath);
}

app.use(express.static(resolvePath('public')));

app.get('*', (req, res) => {
  res.sendFile(resolvePath('public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
