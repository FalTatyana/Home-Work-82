import express from "express";
import Track from "../models/Tracks";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res) => {
  const { album } = req.query;

  if (album) {
    if (typeof album !== "string") {
      return res.status(400).send({ error: "Invalid album id" });
    }

    const tracks = await Track.find({ albumId: album });

    return res.send(tracks);
  }

  try {
    const tracks = await Track.find();

    res.send(tracks);
  } catch {
    res.sendStatus(500);
  }
});

tracksRouter.get("/:id", async (req, res) => {
  try {
    const track = await Track.findById({
      _id: req.params.id,
    });

    if (!track) {
      return res.status(400).send({ error: "Track not found!" });
    }
    res.send(track);
  } catch {
    res.sendStatus(500);
  }
});

tracksRouter.post("/", async (req, res) => {
  const { name, duration, albumId } = req.body;

  if (!duration || !name || !albumId) {
    return res
      .status(400)
      .send({ error: "Name, duration and albumId are required" });
  }

  const newTrack = {
    name,
    duration,
    albumId,
  };

  try {
    const track = new Track(newTrack);
    await track.save();
    res.send(track);
  } catch {
    res.sendStatus(500);
  }
});

export default tracksRouter;
