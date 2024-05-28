import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connectDb.js";
import router from "./routes/user.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT_URL || "5000";
//middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
//data accept json form
app.use(express.json({ limit: "16kb" }));

//data accept url form
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//static file store
app.use(express.static("public"));
//cookier accept
app.use(cookieParser());
//router
app.use("/api/v1/user", router);
app.use("/", router);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("connection failed", error);
  });

//IIFE (Immediately Invoked Function Expression)
// DATA_BASE _CONNECT
// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Database connect Successfully !");
//     app.on("error", (error) => {
//       console.log("Error", error);
//       throw error;
//     });
//     app.listen(port, () => {
//       console.log(`server is running port http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// })();
