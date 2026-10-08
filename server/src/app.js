import express from "express";
import cors from "cors";
import helmet from "helmet";
import urlRoutes from "./routes/url.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.middleware.js";
const app = express();



app.use(helmet());

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));

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




