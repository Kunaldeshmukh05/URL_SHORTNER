import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";
const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));


app.get("/health", (req, res) =>
     res.json({ 
        success: true, status: "ok" 
    }));

app.use("/api/urls", urlRoutes);
app.use("/", redirectRoutes);        

app.use(notFoundHandler);
app.use(errorHandler);               


export default app;




