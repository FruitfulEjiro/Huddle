import dotenv from "dotenv";
import connectDB from "./model/DB.js";
import app from "./app.js";

// setup env variables
dotenv.config();

// connect to DB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
