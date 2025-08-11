import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//console.log("Mongo URI:", process.env.MONGO_URI); // should print the URI

dotenv.config(); // must come before connectDB()

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors({ 
  origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE"], // ✅ allow DELETE

 })
);

//middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {

app.listen(5005, () => {
  console.log("Server started on PORT:", PORT );
});
});




 









// app.get("/api/notes", (req, res) => {
//     res.status(200).send("20 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({message: "note created!"})
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "note updated!"})
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "note deleted!"})
// });

