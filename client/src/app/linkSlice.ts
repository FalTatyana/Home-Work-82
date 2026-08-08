import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi";

export interface originalUrl {
  originalUrl: string;
}

export interface Link {
  _id: string;
  originalUrl: string;
  shortCode: string;
}

interface LinksState {
  links: originalUrl[];
  shortCode: "";
  loading: boolean;
}

const initialState: LinksState = {
  links: [],
  shortCode: "",
  loading: false,
};

export const fetchLink = createAsyncThunk("link/fetchLink", async () => {
  const response = await axiosApi.get<Link[]>("/");
  return response.data;
});

export const addLink = createAsyncThunk(
  "link/addLink",
  async (originalUrl: originalUrl) => {
    const response = await axiosApi.post("/", originalUrl);

    return response.data;
  }
);

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLink.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLink.fulfilled, (state, action) => {
      state.links = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLink.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addLink.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addLink.fulfilled, (state, action) => {
      state.loading = false;
      state.links.push(action.payload);
      state.shortCode = action.payload.shortCode;
      toast.success("Link shortened");
    });
    builder.addCase(addLink.rejected, (state) => {
      state.loading = false;
      toast.error("Link didnt shorten");
    });
  },
});

export const linkReducer = linkSlice.reducer;
export const {} = linkSlice.actions;
