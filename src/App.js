import React, { Component } from "react";
// import Demo from "./components/PhotoGallery/PhotoGallery";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Fade from "./components/Transition/Fade";
import ShowMessage from "./components/Transition/ShowMessage";
import PageRouter from "./components/Transition/PageRouter";
// import video1 from "./2.mp4";
// import gif1 from "./2.gif";

const url = {
  video1: "https://youtu.be/nM0xDI5R50E"
};

class App extends Component {
  render() {
    return (
      <div className="main">
        {/* <VideoPlayer url={url.video1} /> */}
        <Fade />
        <ShowMessage />
        <PageRouter />
      </div>
    );
  }
}

export default App;
