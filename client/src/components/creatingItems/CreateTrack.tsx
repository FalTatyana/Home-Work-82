import { useNavigate } from "react-router-dom";
import "./CreatingItems.css";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../app/store";
import { addTrack } from "../../app/trackSlice";
import { fetchAlbums } from "../../app/albumSlice";
import React from "react";

const CreateTrack = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const albums = useSelector((state: RootState) => state.albums.albums);

  React.useEffect(() => {
    dispatch(fetchAlbums(undefined));
  }, [dispatch]);

  const [track, setTrack] = useState({
    name: "",
    albumId: "",
    duration: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTrack((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!track.name.trim()) {
      toast.error("Enter name");
      return;
    }

    const newTrack = {
      name: track.name,
      albumId: track.albumId,
      duration: track.duration,
    };

    await dispatch(addTrack(newTrack));
    setTrack({
      name: "",
      albumId: "",
      duration: "",
    });

    navigate("/tracks");
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="form-floating col-8">
        <input
          type="name"
          className="form-control creating-input"
          id="name"
          placeholder="name"
          name="name"
          value={track.name}
          onChange={handleChange}
        />
        <label className="creating-label" htmlFor="floatingInput">
          Enter tracks name
        </label>
      </div>
      <div className="mt-3 col-8">
        <select
          className="form-select creating-input"
          aria-label="Default select example"
          name="albumId"
          value={track.albumId}
          onChange={handleChange}
        >
          <option value="">Choose the album</option>
          {albums.map((album) => (
            <option key={album._id} value={album._id}>{album.name}</option>
          ))}
        </select>
      </div>
      <div className=" mb-3 col-8">
        <input 
        type="time" 
        className="form-control creating-input" 
        name="duration"
        value={track.duration}
        onChange={handleChange}
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary creating-btn">
          Add
        </button>
      </div>
    </form>
  );
};

export default CreateTrack;
