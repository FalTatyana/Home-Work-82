import "./CreatingItems.css";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addArtist } from "../../app/artistSlice";
import { useNavigate } from "react-router-dom";

const CreateArtist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [artist, setArtist] = useState({
    name: "",
    info: "",
    img: null,
  });
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtist((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setArtist((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!artist.name.trim()) {
      toast.error("Enter name");
      return;
    }
    
    const newArtist = {
      name: artist.name,
      info: artist.info,
      img: artist.img,
    };

    await dispatch(addArtist(newArtist));
    setArtist({
      name: "",
      info: "",
      img: "",
    });

    navigate('/artists');
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="form-floating col-8">
        <input
          type="text"
          className="form-control creating-input"
          id="name"
          placeholder="name"
          onChange={handleChange}
          name="name"
          value={artist.name}
        />
        <label className="creating-label" htmlFor="floatingInput">
          Enter artists name
        </label>
      </div>
      <div className="form-floating col-8">
        <input
          type="text"
          className="form-control creating-input"
          id="info"
          placeholder="info"
          onChange={handleChange}
          name="info"
          value={artist.info}
        />
        <label className="creating-label" htmlFor="floatingPassword">
          Enter artist info
        </label>
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
        <button
          type="submit"
          className="btn btn-primary creating-btn"
        >
          Add new Artist
        </button>
      </div>
    </form>
  );
};

export default CreateArtist;
