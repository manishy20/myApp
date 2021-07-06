import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const {
    setVideoButton,
    videoButton,
    setMicButton,
    micButton,
    myVideo,
    stream,
    setStream,
    shareScreen,
  } = useContext(SocketContext);

  function screenShare() {
    stream.getVideoTracks()[0].stop();

    navigator.mediaDevices
      .getDisplayMedia({ cursor: true, audio: true })
      .then((captureStreamTrack) => {
    setStream(captureStreamTrack);
// stream[0].getVideoTracks()[0].stop();
// stream[0].replaceTrack(
//   stream[0].getVideoTracks()[0],
//   captureStreamTrack,
//   stream[0]
// );
  });
}
  function handleChangeVideoButton() {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    setVideoButton(!videoButton);
  }

  function handleChangeAudioButton() {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    setMicButton(!micButton);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Video Chat App
          </Typography>
          <Tooltip
            title={videoButton ? "Turn your camera off" : "Turn your camera on"}
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <Button
              color="inherit"
              onClick={handleChangeVideoButton}
              startIcon={
                videoButton ? (
                  <VideocamIcon />
                ) : (
                  <VideocamOffIcon color="secondary" />
                )
              }
            ></Button>
          </Tooltip>

          <Tooltip
            title={micButton ? "Turn your mic off" : "Turn your mic on"}
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <Button
              color="inherit"
              onClick={handleChangeAudioButton}
              startIcon={
                micButton ? <MicIcon /> : <MicOffIcon color="secondary" />
              }
            ></Button>
          </Tooltip>

          <Tooltip
            title="Share your screen"
            placement="top"
            arrow
            TransitionComponent={Zoom}
          >
            <Button
              color="inherit"
              onClick={screenShare}
              startIcon={<ScreenShareIcon />}
            ></Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}
