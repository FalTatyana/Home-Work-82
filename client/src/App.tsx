import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ArtistsList from "./components/itemLists/ArtistsList";
import Albums from "./components/itemLists/AlbumsList";
import Tracks from "./components/itemLists/TracksList";
import CreateArtist from "./components/creatingItems/CreateArtist";
import CreateAlbum from "./components/creatingItems/CreateAlbum";
import CreateTrack from "./components/creatingItems/CreateTrack";
import { ToastContainer } from "react-toastify";
import AlbumInfo from "./components/AlbumInfo";

const App = () => {
  return (
    <div style={{ backgroundColor: "#050716" }}>
      <Layout>
        <Routes>
          <Route path="/artists" element={<ArtistsList />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/create-artist" element={<CreateArtist />} />
          <Route path="/create-album" element={<CreateAlbum />} />
          <Route path="/create-track" element={<CreateTrack />} />
          <Route path="/albums/:id" element={<AlbumInfo/>}/>
          <Route path="*" element={<h1>Not found page</h1>} />
        </Routes>
      </Layout>
      <ToastContainer position="bottom-right" autoClose={2000} theme="light" />
    </div>
  );
};

export default App;
