import "./output.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import HomeComponent from "./routes/Home";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import MyMusic from "./routes/MyMusic";
import UploadSong from "./routes/UploadSong";
import SearchPage from "./routes/SearchPage";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContext";
import { useState } from "react";
import Library from "./routes/Library";
import DailyDose from "./routes/DailyDose";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/dailydose" element={<DailyDose/>} />
              <Route path="/library" element={<Library />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
