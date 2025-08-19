import 'dotenv/config';

import app from './app.ts';

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () => {
  console.log(`API Server is running on http://localhost:${PORT}`);
});
