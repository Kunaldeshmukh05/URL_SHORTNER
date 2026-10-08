import "dotenv/config"
import app from "./app.js"
import connectDB from "./config/db.js";


console.log(process.env.PORT)
const PORT = process.env.PORT || 5000

connectDB();

app.listen(PORT, () => {
    console.log(`\x1b[32mServer running on port ${PORT}\x1b[0m`);
});