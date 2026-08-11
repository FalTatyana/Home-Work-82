import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Track {
  name: string;
  duration: string;
  albumId: string;
  _id: string
}

export interface TrackMutachion {
  name: string;
  duration: string;
  albumId: string;
}

interface ArtistState {
  tracks: Track[];
  loading: boolean;
}

const initialState: ArtistState = {
 tracks: [],
  loading: false,
};

export const fetchTracks = createAsyncThunk("tracks/fetchTracks", async () => {
  const response = await axiosApi.get<Track[]>("/tracks");
  return response.data;
});

export const addTrack = createAsyncThunk(
  "track/addTrack",
  async (track: TrackMutachion) => {
    const response = await axiosApi.post("/tracks", track);

    return response.data;
  }
);

export const tracksSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addTrack.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTrack.fulfilled, (state, action) => {
      state.loading = false;
      state.tracks.push(action.payload);
      toast.success("Track added");
    });
    builder.addCase(addTrack.rejected, (state) => {
      state.loading = false;
      toast.error("Track didnt add");
    });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const {} = tracksSlice.actions;
