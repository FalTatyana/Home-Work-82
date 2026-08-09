import mongoose from "mongoose";

const AlbumShema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 artistId: {
  type: String,
  required: true,
 },
 year: {
  type: String,
  required: true,
 },
 img: String
});

const Album = mongoose.model('Album', AlbumShema);
export default Album;