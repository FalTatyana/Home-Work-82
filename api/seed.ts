import config from "./config";
import mongoose from "mongoose";

import Artist from "./models/Artists";
import Album from "./models/Albums";
import Track from "./models/Tracks";

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);

  try {
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Track.deleteMany({});

    const [postMalone, lp, brunoMars] = await Artist.create(
      {
        name: "Post Malone",
        info: "American singer, rapper, songwriter and record producer.",
        img: "imagescbb6b240-0e6f-42b2-b8e8-d416c397acd8.jpg",
      },
      {
        name: "LP",
        info: "American singer and songwriter.",
        img: "imagesc7aec51c-4e80-405d-a7df-1f6a604e7c57.jpeg",
      },
      {
        name: "Bruno Mars",
        info: "American singer, songwriter and record producer.",
        img: "imagesf101bed3-5051-4c81-b035-09835c081fdd.jpg",
      }
    );

    const [
      hollywoodsBleeding,
      lostOnYouAlbum,
      unorthodoxJukebox,
    ] = await Album.create(
      {
        name: "Hollywood's Bleeding",
        artistId: postMalone._id.toString(),
        year: new Date("2019-01-01"),
        img: "imagesdb5cc3dd-4a68-41e3-b5bb-db8fa67380b8.jpg",
      },
      {
        name: "Lost on You",
        artistId: lp._id.toString(),
        year: new Date("2016-01-01"),
        img: "imagesb3de33a3-260c-4920-9935-647c6876e24b.webp",
      },
      {
        name: "Unorthodox Jukebox",
        artistId: brunoMars._id.toString(),
        year: new Date("2012-01-01"),
        img: "images5d6a77b0-a320-4a00-a2c9-d4ea868b798a.jpg",
      }
    );

    await Track.create(
      {
        name: "Circles",
        duration: "03:35",
        albumId: hollywoodsBleeding._id.toString(),
        trackNumber: 1,
      },
      {
        name: "A Thousand Bad Times",
        duration: "03:41",
        albumId: hollywoodsBleeding._id.toString(),
        trackNumber: 2,
      },
      {
        name: "Lost on You",
        duration: "04:28",
        albumId: lostOnYouAlbum._id.toString(),
        trackNumber: 1,
      },
      {
        name: "Other People",
        duration: "04:04",
        albumId: lostOnYouAlbum._id.toString(),
        trackNumber: 2,
      },
      {
        name: "Locked Out of Heaven",
        duration: "03:53",
        albumId: unorthodoxJukebox._id.toString(),
        trackNumber: 1,
      },
      {
        name: "When I Was Your Man",
        duration: "03:33",
        albumId: unorthodoxJukebox._id.toString(),
        trackNumber: 2,
      }
    );

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await mongoose.connection.close();
  }
};

run().catch(console.error);