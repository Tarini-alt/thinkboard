import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//console.log("Mongo URI:", process.env.MONGO_URI); // should print the URI

dotenv.config(); // must come before connectDB()


const app = express();
const PORT = process.env.PORT || 5005;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
  app.use(cors({ 
  origin: "http://localhost:5173",
   methods: ["GET", "POST", "PUT", "DELETE"], // ✅ allow DELETE

 })
);
}

//middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get(/^(?!\/api).*/, (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

// After all routes and middleware have been set up, before app.listen
if (app._router) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log('Route:', middleware.route.path);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        console.log('Router Route:', handler.route?.path);
      });
    }
  });
}



connectDB().then(() => {

app.listen(5005, () => {
  console.log("Server started on PORT:", PORT );
});
});




 









// // app.get("/api/notes", (req, res) => {
// //     res.status(200).send("20 notes");
// // });

// // app.post("/api/notes", (req, res) => {
// //     res.status(201).json({message: "note created!"})
// // });

// // app.put("/api/notes/:id", (req, res) => {
// //     res.status(200).json({message: "note updated!"})
// // });

// // app.delete("/api/notes/:id", (req, res) => {
// //     res.status(200).json({message: "note deleted!"})
// // });
