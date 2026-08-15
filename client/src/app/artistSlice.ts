import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface Artist {
  name: string;
  img: string;
  info: string;
  _id: string;
}

export interface ArtistMutation {
  name: string;
  info: string;
  img: File | null;
}

interface ArtistState {
  artists: Artist[];
  loading: boolean;
}

const initialState: ArtistState = {
  artists: [],
  loading: false,
};

export const fetchArtists = createAsyncThunk(
  "artist/fetchArtists",
  async () => {
    const response = await axiosApi.get<Artist[]>("/artists");
    return response.data;
  }
);

export const addArtist = createAsyncThunk(
  "artist/addArtist",
  async (artist: ArtistMutation) => {
    const formData = new FormData();

    formData.append("name", artist.name);
    formData.append("info", artist.info);
    if (artist.img) {
      formData.append("img", artist.img);
    }
    const response = await axiosApi.post("/artists", formData);
    return response;
  }
);

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
    builder.addCase(addArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addArtist.fulfilled, (state, action) => {
      state.loading = false;
      state.artists.push(action.payload);
      toast.success("Artist added");
    });
    builder.addCase(addArtist.rejected, (state) => {
      state.loading = false;
      toast.error("Artist did not add");
    });
  },
});

export const artistReducer = artistSlice.reducer;
export const {} = artistSlice.actions;
