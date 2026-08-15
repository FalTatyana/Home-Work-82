import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config.js";
import tracksRouter from "./routers/tracks.js";
import albumsRouter from "./routers/albums.js";
import artistRouter from "./routers/artists.js";
import usersRouter from "./routers/users.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/tracks", tracksRouter);
app.use("/albums", albumsRouter);
app.use("/artists", artistRouter);
app.use("/users", usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);

  app.listen(port, () => {
    console.log(`listen on port ` + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
