import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ArtistsList from "./components/ArtistsList";
import Albums from "./components/Albums";
import Tracks from "./components/Tracks";
import CreateArtist from "./components/CreateArtist";
import CreateAlbum from "./components/CreateAlbum";
import CreateTrack from "./components/CreateTrack";

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
