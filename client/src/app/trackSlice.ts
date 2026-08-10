import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Track {
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

// export const addLink = createAsyncThunk(
//   "link/addLink",
//   async (originalUrl: originalUrl) => {
//     const response = await axiosApi.post("/", originalUrl);

//     return response.data;
//   }
// );

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
    // builder.addCase(addLink.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(addLink.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.links.push(action.payload);
    //   state.shortCode = action.payload.shortCode;
    //   toast.success("Link shortened");
    // });
    // builder.addCase(addLink.rejected, (state) => {
    //   state.loading = false;
    //   toast.error("Link didnt shorten");
    // });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const {} = tracksSlice.actions;
