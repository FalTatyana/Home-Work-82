import { NavLink } from 'react-router-dom';
import './CreatingItems.css';

const CreateArtist = () => {
  return (
    <form className="row g-3">
      <div className="form-floating col-8">
        <input
          type="name"
          className="form-control creating-input"
          id="name"
          placeholder="name"
        />
        <label className='creating-label' htmlFor="floatingInput">Enter artists name</label>
      </div>
      <div className="form-floating col-8">
        <input
          type="info"
          className="form-control creating-input"
          id="info"
          placeholder="info"
        />
        <label className='creating-label' htmlFor="floatingPassword">Enter artist info</label>
      </div>
      <div className="mb-3 col-8">
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

export default CreateArtist;
