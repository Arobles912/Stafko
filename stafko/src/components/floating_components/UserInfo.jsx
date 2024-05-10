import { useEffect, useState } from "react";
import "./styles/UserInfo.css";
import { fetchUserInfo } from "../../utils/api_calls/ApiCalls";

export default function UserInfo({
  project,
  username,
  setIsUserInfo,
  isUserInfo,
}) {
  const [totalTime, setTotalTime] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isUserInfo) {
      fetchUserInfo(project, username, formatTime, setEmail, setTotalTime);
    }
  }, [isUserInfo, project, username]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="main-user-info-div">
      <div className="user-info-div">
        <div className="close-div">
          <button type="button" onClick={() => setIsUserInfo(false)}>
            X
          </button>
        </div>
        <div className="user-title">
          <img
            src="src/assets/user_images/user-icon.png"
            alt="colaborators-icon"
          />
          <h3>{username}</h3>
        </div>
        <p>
          Email: <span>{email}</span>
        </p>
        <p>
          Total time worked: <span>{totalTime}</span>
        </p>
      </div>
    </div>
  );
}
