import mongoose from "mongoose";

const TrackShema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 duration: {
  type: String,
  required: true,
 },
 albumId: {
  type: String,
  required: true,
 }
});

const Track = mongoose.model('Track', TrackShema);
export default Track;