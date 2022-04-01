import React, { useEffect } from "react";
import "./VideoPlayer.css";
interface Props {
  socket: any;
}

const VideoPlayer: React.FC<Props> = ({ socket }) => {
  const videoPlayer = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket.on("video-paused", (obj: any) => {
      console.log("video paused");
      if (obj.currentTime < videoPlayer.current!.currentTime) {
        videoPlayer.current!.currentTime = obj.currentTime;
      }
      videoPlayer.current!.pause();
    });

    socket.on("video-played", (obj: any) => {
      console.log("video played");
      if (obj.currentTime < videoPlayer.current!.currentTime) {
        videoPlayer.current!.currentTime = obj.currentTime;
      }

      videoPlayer.current!.play();
    });
  }, [socket]);
  const playVideo = () => {
    // You can use the play method as normal on your video ref
    console.log("play video", videoPlayer.current!.currentTime);
    socket.emit("play-video", {
      currentTime: videoPlayer.current!.currentTime,
    });
  };

  const pauseVideo = () => {
    // Pause as well
    console.log("play video", videoPlayer.current!.currentTime);
    socket.emit("pause-video", {
      currentTime: videoPlayer.current!.currentTime,
    });
  };
  return (
    <>
      <div className="VideoPlayer">
        <video
          ref={videoPlayer}
          controls
          onPlay={playVideo}
          onPause={pauseVideo}
          // autoPlay={true}
        >
          <source src="movie.mkv" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div></div>
    </>
  );
};
export default VideoPlayer;
