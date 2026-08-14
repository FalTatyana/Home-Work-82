import express from "express";
import Album from "../models/Albums";
import Artist from "../models/Artists";
import { imagesUpload } from "../multer";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
  try {
    const { artist } = req.query;

    if (artist) {
      if (typeof artist !== "string") {
        return res.status(400).send({ error: "Invalid artist id" });
      }
      const albums = await Album.find({ artistId: artist });

      return res.send(albums);
    }

    const albums = await Album.find();

    res.send(albums);
  } catch {
    res.sendStatus(500);
  }
});

albumsRouter.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(400).send({ error: "Album not found!" });
    }

    const artist = await Artist.findById(album.artistId);

    if (!artist) {
      return res.status(400).send({ error: "Artist not found!" });
    }

    const albumInfo = {
      album,
      artist,
    };

    res.send(albumInfo);
  } catch {
    res.sendStatus(500);
  }
});

albumsRouter.post("/", imagesUpload.single('img'), async (req, res) => {
  const { name, artistId, year } = req.body;

  if (!artistId || !name || !year) {
    return res
      .status(400)
      .send({ error: "artistId, name and year are required" });
  }

  const newAlbum = {
    name,
    artistId,
    year,
    img: req.file ? req.file.filename : null,
  };

  try {
    const album = new Album(newAlbum);
    await album.save();
    res.send(album);
  } catch {
    res.sendStatus(500);
  }
});

export default albumsRouter;
