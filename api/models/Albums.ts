import mongoose from "mongoose";

const AlbumSсhema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 artistId: {
  type: String,
  required: true,
 },
 year: {
  type: Date,
  required: true,
 },
 img: String
});

const Album = mongoose.model('Album', AlbumSсhema);
export default Album;