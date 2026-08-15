import "./CreatingItems.css";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { addAlbum } from "../../app/albumSlice";
import { fetchArtists } from "../../app/artistSlice";
import React from "react";

const CreateAlbum = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const artists = useSelector((state: RootState) => state.artists.artists);

  React.useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const [album, setAlbum] = useState({
    name: "",
    artistId: "",
    year: "",
    img: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAlbum((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAlbum((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!album.name.trim()) {
      toast.error("Enter name");
      return;
    }

    if (!album.artistId) {
      toast.error("Enter artist");
      return;
    }

    if (!album.year) {
      toast.error("Enter year");
      return;
    }

    const newAlbum = {
      name: album.name,
      artistId: album.artistId,
      year: album.year,
      img: album.img,
    };

    await dispatch(addAlbum(newAlbum));
    setAlbum({
      name: "",
      artistId: "",
      year: "",
      img: "",
    });

    navigate("/albums");
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="form-floating col-8">
        <input
          type="text"
          className="form-control creating-input"
          id="name"
          placeholder="name"
          name="name"
          value={album.name}
          onChange={handleChange}
        />
        <label className="form-label creating-label" htmlFor="name">
          Enter album name
        </label>
      </div>
      <div className="form-floating col-8">
        <input
          type="number"
          className="form-control creating-input"
          id="year"
          placeholder="year"
          name="year"
          value={album.year}
          onChange={handleChange}
        />
        <label className="creating-label" htmlFor="info">
          Year album created
        </label>
      </div>
      <div className="mt-3 col-8">
        <select
          className="form-select creating-input"
          aria-label="Default select example"
          name="artistId"
          value={album.artistId}
          onChange={handleChange}
        >
          <option value="">Choose the artist</option>
          {artists.map((artist) => (
            <option key={artist._id} value={artist._id}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3 mt-3 col-8">
        <input
          className="form-control creating-input"
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary creating-btn">
          Add new album
        </button>
      </div>
    </form>
  );
};

export default CreateAlbum;
