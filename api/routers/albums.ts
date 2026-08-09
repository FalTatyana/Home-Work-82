import express from "express";
import Album from "../models/Albums";
import Artist from "../models/Artists";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
  try {
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

    console.log(album);
    console.log(album.artistId);
    
    const artist  = await Artist.findById(album.artistId);

    console.log("artist", artist);
    
    if (!artist) {
     return res.status(400).send({ error: "Artist not found!" });
   }
    
    console.log(artist);
    
    const albumInfo = {
     album,
     artist
    };
    console.log(albumInfo);
    
    res.send(albumInfo);
  } catch {
    res.sendStatus(500);
  }
});

albumsRouter.post("/", async (req, res) => {
  const { name, artistId, year, img } = req.body;
  
  if (!artistId || !name || !year) {
    return res.status(400).send({ error: "artistId, name and year are required" });
  }

  const newAlbum = {
    name,
    artistId,
    year,
    img
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
