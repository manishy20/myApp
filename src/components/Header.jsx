import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VideoOnOffButton from "./VideoOnOffButton";
import MicOnOffButton from "./MicOnOffButton";
import { Phone, PhoneDisabled } from "@material-ui/icons";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },

  makeACall: {
    display: "flex",
    paddingInline: theme.spacing(1),
  },
}));

function Header() {
  const classes = useStyles();

  const {
    connected,
    callAccepted,
    idToCall,
    callUser,
    callEnded,
    hangUpCall,
    leaveMeeting,
  } = useContext(SocketContext);

  return (
    <div className={classes.root}>
      <AppBar position="static" color={connected ? "primary" : "default"}>
        <Toolbar>
          {!connected ? (
            <Typography
              variant="h6"
              className={classes.title}
              color="textSecondary"
            >
              Not Connected
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.title}>
              Connected
            </Typography>
          )}

          {connected ? (
            <div className={classes.makeACall}>
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={hangUpCall}
                >
                  Hang Up
                </Button>
              ) : (
                <div className={classes.makeACall}>
                  <div>
                    <Button
                      variant="contained"
                      startIcon={<Phone fontSize="large" />}
                      onClick={leaveMeeting}
                      color="secondary"
                      className={classes.makeACall}
                    >
                      Leave Meet
                    </Button>
                  </div>
                  <div className={classes.makeACall}>
                    <Button
                      variant="contained"
                      startIcon={<Phone fontSize="large" />}
                      onClick={() => callUser(idToCall)}
                    >
                      Make a call
                    </Button>
                  </div>
                </div>
              )}

              <VideoOnOffButton />
              <MicOnOffButton />
            </div>
          ) : (
            <div className={classes.makeACall}>
              <VideoOnOffButton />
              <MicOnOffButton />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
