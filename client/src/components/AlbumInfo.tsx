import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import React from "react";
import { fetchArtists } from "../app/artistSlice";
import { fetchAlbums } from "../app/albumSlice";
import { useParams } from "react-router-dom";

const AlbumInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const artists = useSelector((state: RootState) => state.artists.artists);
  const loading = useSelector((state: RootState) => state.albums.loading);

  React.useEffect(() => {
    dispatch(fetchAlbums(id || undefined));
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const foundAlbum = albums.find((album) => album._id === id);

  const album = {
    ...foundAlbum,
  };

  const foundArtist = artists.find((artist) => artist._id === album.artistId);

  const artist = {
    ...foundArtist,
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div
      className="card mb-3"
      style={{
        backgroundColor: "#050615",
        color: "white",
        border: "1px solid grey",
      }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={album.img}
            className="img-fluid rounded-start "
            alt={album.name}
            style={{ height: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{album.name}</h5>
            <p className="card-text" style={{ color: "white" }}>
              Year{album.year}
            </p>

            <h6>{artist.name}</h6>
            <p className="card-text">{artist.info}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfo;
