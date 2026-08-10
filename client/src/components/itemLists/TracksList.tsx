import { useDispatch, useSelector } from 'react-redux';
import './itemLists.css';
import React from 'react';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchTracks } from '../../app/trackSlice';

const Tracks = () => {

  const dispatch = useDispatch<AppDispatch>();
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const loading = useSelector((state: RootState) => state.tracks.loading);

  React.useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  if (loading) {
    return <h3>Loading...</h3>;
  }
  
  return (
    <>
    {tracks.map(track => (
              <div className="card list-item-card">
                  <div className="card-body card-body-list">
                    <h5 className="card-title ms-3 col-md-4">{track.name}</h5>
                    <p className="card-text col-md-6">{track.duration}</p>
              </div>
            </div>
    ))}
    </>
  );
};

export default Tracks;
