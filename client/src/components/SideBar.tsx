import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linksAr = [
    {
      name: "Home",
      path: "/",
      icon: "house-door",
    },
    {
      name: "Tracks",
      path: "/tracks",
      icon: "music-note-beamed",
    },
    {
      name: "Artists",
      path: "/artists",
      icon: "person",
    },
    {
      name: "Albums",
      path: "/albums",
      icon: "list",
    },
  ];

  return (
    <div
      className="text-white p-3 min-vh-100 flex-shrink-0"
      style={{
        width: "250px",
        backgroundColor: "#050716",
        borderRadius: "20px",
        border: "1px solid transparent",
        background:
          "linear-gradient(#050716, #050716) padding-box, linear-gradient(45deg, #F14BB1, #050716, #05B8FD) border-box",
      }}
    >
      <h4 className="display-6">
        <i
          className="bi bi-soundwave display-6 me-3"
          style={{ color: "#F14BB1" }}
        ></i>
        Soundify
      </h4>

      <ul className="nav flex-column mt-4 ms-2">
        {linksAr.map((link) => {
          return (
            <li className="nav-link mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active-tab" : "nav-link"
                }
                style={({ isActive }) => ({
                  color: "white",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid transparent",
                  borderRadius: isActive ? "10px" : "0",
                  background: isActive
                    ? "linear-gradient(to right, #050716, #F14BB1) padding-box, linear-gradient(45deg, #F14BB1, #050716) border-box"
                    : "0",
                })}
              >
                <i
                  className={`bi bi-${link.icon} me-4`}
                  style={{ color: "#F14BB1" }}
                ></i>
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
