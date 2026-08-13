import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Album {
  name: string;
  artistId: string;
  year: string;
  img: string;
  _id: string;
}

export interface AlbumMutachion {
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

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async (artistId?:string) => {
  const response = await axiosApi.get<Album[]>("/albums", {
    params: artistId
    ? {artist: artistId}
    : {}
  });
  return response.data;
});

export const addAlbum = createAsyncThunk(
  "album/addAlbum",
  async (album: AlbumMutachion) => {
    const response = await axiosApi.post("/albums", {album});

    return response.data;
  }
);

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
    builder.addCase(addAlbum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAlbum.fulfilled, (state, action) => {
      state.loading = false;
      state.albums.push(action.payload);
      toast.success("Album Added");
    });
    builder.addCase(addAlbum.rejected, (state) => {
      state.loading = false;
      toast.error("Album didnt add");
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const {} = albumsSlice.actions;
