import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

import { SocketContext } from "../SocketContext";

function VideoOnOffButton() {
  const { setVideoButton, videoButton, stream } = useContext(SocketContext);

  //function to on/off video button
  function handleChangeVideoButton() {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    setVideoButton(!videoButton);
  }
  return (
    <Tooltip
      title={videoButton ? "Turn off your camera" : "Turn on your camera"}
      placement="top"
      arrow
      TransitionComponent={Zoom}
    >
      <Button color="inherit" onClick={handleChangeVideoButton}>
        {videoButton ? <VideocamIcon /> : <VideocamOffIcon color="secondary" />}
      </Button>
    </Tooltip>
  );
}
export default VideoOnOffButton;
