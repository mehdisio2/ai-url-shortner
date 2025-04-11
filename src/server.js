import dotenv from 'dotenv';  // Use import instead of require
import app from './app.js';    // Use ES Module import syntax

dotenv.config();  // Load environment variables

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
