import React, { useContext } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";

import { SocketContext } from "../SocketContext";

function MicOnOffButton() {
  const { setMicButton, micButton, stream } = useContext(SocketContext);

  //function to on/off mic button
  function handleChangeAudioButton() {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    setMicButton(!micButton);
  }

  return (
    <Tooltip
      title={micButton ? "Turn off your mic" : "Turn on your mic on"}
      placement="top"
      arrow
      TransitionComponent={Zoom}
    >
      <Button color="inherit" onClick={handleChangeAudioButton}>
        {micButton ? <MicIcon /> : <MicOffIcon color="secondary" />}
      </Button>
    </Tooltip>
  );
}
export default MicOnOffButton;
