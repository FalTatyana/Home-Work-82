import mongoose from "mongoose";

const TrackHistorySchema = new mongoose.Schema({
 user: {
  type: String,
  required: true,
 },
 track: {
  type: String,
  required: true,
 },
 datetime: {
  type: Date,
  required: true,
 }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;