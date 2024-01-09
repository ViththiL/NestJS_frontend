import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const serverPath = process.pkg ? path.join(process.cwd(), '../') : process.cwd();

app.use(express.static(path.join(serverPath, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(serverPath, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
