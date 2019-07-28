import React from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

const VideoWrapper = ({ url, playing, loop }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        height="100%"
        playing={false || playing}
        loop={false || loop}
      />
    </div>
  );
};

export default VideoWrapper;
