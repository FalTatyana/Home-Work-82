import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Album {
  name: string;
  artistId: string;
  year: string;
  img: string;
}

interface ArtistState {
  albums: Album[];
  loading: boolean;
}

const initialState: ArtistState = {
  albums: [],
  loading: false,
};

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  const response = await axiosApi.get<Album[]>("/albums");
  return response.data;
});

// export const addLink = createAsyncThunk(
//   "link/addLink",
//   async (originalUrl: originalUrl) => {
//     const response = await axiosApi.post("/", originalUrl);

//     return response.data;
//   }
// );

export const albumsSlice = createSlice({
  name: "album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
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

export const albumsReducer = albumsSlice.reducer;
export const {} = albumsSlice.actions;
