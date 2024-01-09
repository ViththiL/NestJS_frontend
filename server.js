import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine the correct path based on execution context
const serverPath = process.pkg ? path.join(process.execPath, '../') : __dirname;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(serverPath, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(serverPath, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
