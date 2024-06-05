import SingleSongCard from "../components/shared/SingleSongCard";
import {useState, useEffect} from "react";
import {makeAuthenticatedGETRequest} from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";


const DailyDose = () => {
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
                "/song/get/allsongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);
  
    return (
        <LoggedInContainer curActiveScreen="dailydose">
            <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
                Daily Dose
            </div>
            <div className="space-y-3 overflow-auto">
                {songData.map((item) => {
                    return <SingleSongCard info={item} playSound={() => {}} />;
                })}
            </div>
        </LoggedInContainer>
    );
  };
  
  
  
  export default DailyDose;
  