import './App.css';
import socketIOClient from "socket.io-client";
import VideoPlayer from './VideoPlayer/VideoPlayer';
const socket = socketIOClient('/');

function App() {
  return (
    <VideoPlayer socket={socket}/>
  );
}

export default App;
