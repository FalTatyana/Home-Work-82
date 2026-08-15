import { useDispatch, useSelector } from "react-redux";
import "./itemLists.css";
import type { AppDispatch, RootState } from "../../app/store";
import React from "react";
import { fetchArtists } from "../../app/artistSlice";

const ArtistsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const artists = useSelector((state: RootState) => state.artists.artists);
  const loading = useSelector((state: RootState) => state.artists.loading);

  React.useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (artists.length === 0) {
    return (<h1>Not artist yet</h1>)
  }

  return (
    <>
      {artists.map((artist) => (
        <div key={artist.name} className="card list-item-card">
          <div className="row g-0">
            <div className="col-md-2">
              <img
                src={`http://localhost:8000/images/${artist.img}`}
                className="img-fluid rounded-start list-items-img"
                alt={artist.name}
              />
            </div>
            <div className="col-md-10">
              <div className="card-body card-body-list">
                <h5 className="card-title col-md-4">{artist.name}</h5>
                <p className="card-text col-md-7">{artist.info}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ArtistsList;
