import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Artist {
  name: string;
  img: string;
  info: string;
}

interface ArtistState {
  artists: Artist[];
  loading: boolean;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
};

export const fetchArtists = createAsyncThunk("artist/fetchArtists", async () => {
  const response = await axiosApi.get<Artist[]>("/artists");
  return response.data;
});

// export const addLink = createAsyncThunk(
//   "link/addLink",
//   async (originalUrl: originalUrl) => {
//     const response = await axiosApi.post("/", originalUrl);

//     return response.data;
//   }
// );

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
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

export const artistReducer = artistSlice.reducer;
export const {} = artistSlice.actions;
