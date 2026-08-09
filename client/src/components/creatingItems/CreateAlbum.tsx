import { NavLink } from "react-router-dom";
import "./CreatingItems.css";

const CreateAlbum = () => {
  return (
    <form className="row g-3">
      <div className="form-floating col-8">
        <input
          type="text"
          className="form-control creating-input"
          id="name"
          placeholder="name"
        />
        <label className="form-label creating-label" htmlFor="name">
          Enter album name
        </label>
      </div>
      <div className="form-floating col-8">
        <input
          type="text"
          className="form-control creating-input"
          id="info"
          placeholder="info"
        />
        <label className='creating-label' htmlFor="info">Enter album info</label>
      </div>
      <div className="mt-3 col-8">
        <select className="form-select creating-input" aria-label="Default select example">
          <option value="">Choose the artist</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div className="mb-3 mt-3 col-8">
        <input className="form-control creating-input" type="file" id="formFile" />
      </div>
      <div className="col-12">
        <NavLink to={'/'} type="submit" className="btn btn-primary creating-btn">
          Add
        </NavLink>
      </div>
    </form>
  );
};

export default CreateAlbum;
