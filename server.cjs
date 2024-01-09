const express = require('express');
const path = require('path');
const { readFileSync } = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to determine the path of a file within the pkg snapshot filesystem
const getPath = (relativePath) => {
    if (process.pkg) {
        // If running from pkg executable, path is relative to the executable path
        return path.join(path.dirname(process.execPath), relativePath);
    }
    // If running in development, path is relative to the current working directory
    return path.join(__dirname, relativePath);
};

// Serve static files
app.use(express.static(getPath('public')));

// Handle all requests by sending the 'index.html' file
app.get('*', (req, res) => {
    try {
        const indexPath = getPath('public/index.html');
        const content = readFileSync(indexPath, 'utf-8');
        res.send(content);
    } catch (error) {
        res.status(500).send('Error loading index.html');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
