import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="d-flex mt-3 mb-5">
      <NavLink
        type="button"
        className="btn btn-outline me-4 py-2"
        to={"/create-artist"}
        style={({ isActive }) => ({
          width: '150px',
          color: "white",
          border: isActive ? "1px solid transparent" : "1px solid transparent",
          borderRadius: '10px',
          background: isActive
            ? "linear-gradient(45deg, #060817, #590FA4, #F14BB1) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box"
            : "linear-gradient(#060817) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box" ,        })}
      >
        Create artist
      </NavLink>
      <NavLink
        type="button"
        className="btn btn-outline me-4 py-2"
        to={"/create-album"}
        style={({ isActive }) => ({
          width: '150px',
          color: "white",
          border: isActive ? "1px solid transparent" : "1px solid transparent",
          borderRadius: '10px',
          background: isActive
            ? "linear-gradient(45deg, #060817, #590FA4, #F14BB1) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box"
            : "linear-gradient(#060817) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box" ,        })}
      >
        Create album
      </NavLink>
      <NavLink
        type="button"
        className="btn btn-outline py-2"
        to={"/create-track"}
        style={({ isActive }) => ({
          width: '150px',
          color: "white",
          border: isActive ? "1px solid transparent" : "1px solid transparent",
          borderRadius: '10px',
          background: isActive
            ? "linear-gradient(45deg, #060817, #590FA4, #F14BB1) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box"
            : "linear-gradient(#060817) padding-box, linear-gradient(45deg, #F14BB1, #060817, #590fa4) border-box" ,
        })}
      >
        Create track
      </NavLink>
    </div>
  );
};

export default Header;
