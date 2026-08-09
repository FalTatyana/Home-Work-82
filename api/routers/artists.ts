import express from "express";
import Artist from "../models/Artists";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();

    res.send(artists);
  } catch {
    res.sendStatus(500);
  }
});

artistRouter.post("/", async (req, res) => {
  const { name, img, info } = req.body;
  
  if (!name) {
    return res.status(400).send({ error: "Name is required" });
  }

  const newArtist = {
    name,
    img,
    info
  };

  try {
    const artist = new Artist(newArtist);
    await artist.save();
    res.send(artist);
  } catch {
    res.sendStatus(500);
  }
});

export default artistRouter;
