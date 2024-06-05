import SingleSongCard from "../components/shared/SingleSongCard";
import {useState, useEffect} from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import {Howl, Howler} from 'howler'; 
import LoggedInContainer from "../containers/LoggedInContainer";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);

  const playSound = () => {
    if (!soundPlayed) {
        return;
    }
    soundPlayed.play();
};


  useEffect(() => {
      const getData = async () => {
          const response = await makeAuthenticatedGETRequest(
              "/song/get/mysongs"
          );
          setSongData(response.data);
      };
      getData();
  }, []);

  return (
      <LoggedInContainer curActiveScreen="myMusic">
          <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
              My Songs
          </div>
          <div className="space-y-3 overflow-auto">
              {songData.map((item) => {
                  return <SingleSongCard info={item} playSound={() => {}} />;
              })}
          </div>
      </LoggedInContainer>
  );
};



export default MyMusic;
