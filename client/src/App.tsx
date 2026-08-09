import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ArtistsList from "./components/ArtistsList";
import Albums from "./components/AlbumsList";
import Tracks from "./components/TracksList";
import CreateArtist from "./components/creatingItems/CreateArtist";
import CreateAlbum from "./components/creatingItems/CreateAlbum";
import CreateTrack from "./components/creatingItems/CreateTrack";

const App = () => {
  return (
    <div style={{backgroundColor: "#050716"}}>
      <Layout >
        <Routes>
          <Route path="/artists" element={<ArtistsList/>}/>
          <Route path="/albums" element={<Albums/>}/>
          <Route path="/tracks" element={<Tracks/>}/>
          <Route path="/create-artist" element={<CreateArtist/>}/>
          <Route path="/create-album" element={<CreateAlbum/>}/>
          <Route path="/create-track" element={<CreateTrack/>}/>
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
