import express from "express";


// Local Modules
import Errorhandler from "./utils/ErrorHandler.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// Routes

app.use(Errorhandler)
export default app;

