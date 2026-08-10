import {configureStore} from "@reduxjs/toolkit";
import { artistReducer } from "./artistSlice";
import { tracksReducer } from "./trackSlice";
import { albumsReducer } from "./albumSlice";



export const store = configureStore({
  reducer: {
    artists: artistReducer,
    tracks: tracksReducer,
    albums: albumsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;