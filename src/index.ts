import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express from 'express';

expand(config());

const app = express();
const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server is live @ Port ${PORT}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello',
  });
});
