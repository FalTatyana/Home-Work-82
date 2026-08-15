import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import "./itemLists.css";
import { fetchAlbums } from "../../app/albumSlice";
import { useSearchParams } from "react-router-dom";

const Albums = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const loading = useSelector((state: RootState) => state.albums.loading);


  const artistId = searchParams.get("artist");

  useEffect(() => {
    dispatch(fetchAlbums(artistId || undefined));
  }, [dispatch, artistId]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (albums.length === 0) {
    return <h3>No albums yet</h3>;
  }

  return (
    <>
      {albums.map((album) => (
        <div key={album._id} className="card list-item-card">
          <div className="row g-0">
            <div className="col-md-1">
              <img
                src={`http://localhost:8000/images/${album.img}`}
                className="img-fluid rounded-start list-items-img"
                alt={album.name}
              />
            </div>
            <div className="col-md-11">
              <div className="card-body card-body-list">
                <h5 className="card-title ms-3 col-md-4">{album.name}</h5>
                <p className="card-text col-md-6">{album.year} year</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Albums;
