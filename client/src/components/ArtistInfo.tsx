import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { useEffect } from "react";
import { fetchAlbums } from "../app/albumSlice";
import { useParams } from "react-router-dom";
import { fetchArtists } from "../app/artistSlice";
import { fetchTracks } from "../app/trackSlice";

const AlbumInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const albums = useSelector((state: RootState) => state.albums.albums);
  const artists = useSelector((state: RootState) => state.artists.artists);
  const tracks = useSelector((state: RootState) => state.tracks.tracks);

  const loading = useSelector((state: RootState) => state.albums.loading);

  useEffect(() => {
    dispatch(fetchAlbums(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTracks(undefined));
  }, [dispatch, undefined]);

  const foundArtist = artists.find((artist) => id === artist._id);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (!foundArtist) {
    return <h3>Artist not found!</h3>;
  }

  return (
    <>
      <h6 className="display-6 mb-3" style={{ color: "white" }}>
        {foundArtist.name}
      </h6>

      {albums.map((album) => {
        const albumTracks = tracks.filter(
          (track) => track.albumId === album._id
        );

        return (
          <div
            className="card mb-3"
            key={album._id}
            style={{
              backgroundColor: "#050615",
              color: "white",
              border: "1px solid grey",
            }}
          >
            <div className="row g-0">
              <div className="col-md-2">
                <img
                  src={`http://localhost:8000/images/${album.img}`}
                  className="img-fluid rounded-start"
                  alt={album.name}
                  style={{ width: "150px" }}
                />
              </div>

              <div className="col-md-10">
                <div className="card-body">
                  <h5 className="display-5">{album.name}</h5>

                  <p className="card-text">
                    Year {new Date(album.year).getFullYear()}
                  </p>

                  {albumTracks.length === 0 ? (
                    <p>No tracks</p>
                  ) : (
                    <>
                      <h6 className="display-6 mt-5">Tracks</h6>
                      <ol className="list-group list-group-numbered">
                        {albumTracks.map((track) => (
                          <li
                            className="list-group-item"
                            key={track._id}
                            style={{
                              backgroundColor: "#050615",
                              color: "white",
                              border: "none",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            {track.name} — {track.duration}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AlbumInfo;
