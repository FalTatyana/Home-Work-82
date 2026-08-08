import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <div className="d-flex mt-3">
     <NavLink type="button" className="btn btn-outline-primary me-3" to={"/create-artist"}>Create artist</NavLink>
     <NavLink type="button" className="btn btn-outline-primary me-3" to={"/create-album"}>Create album</NavLink>
     <NavLink type="button" className="btn btn-outline-primary me-3" to={"/create-track"}>Create track</NavLink>
    </div>
  )
}

export default Header;