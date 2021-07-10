import React, {useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CallIcon from "@material-ui/icons/Call";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {Button, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VideoOnOffButton from "./VideoOnOffButton";
import MicOnOffButton from "./MicOnOffButton";


import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    padding: "2px",
    alignItems: "center",
    fullWidth: "true",
  maxWidth: "sm",
  },
  middle: {
    padding: 2,
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    whiteSpace: "nowrap",
  },

  answer: {
    display: "flex",
    flexDirection: "column",
     textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    whiteSpace: "nowrap",
  },

  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
     textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    whiteSpace: "nowrap",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(1),
  },
}));

export default function AnswerDialogBox({ children }) {
  const [open, setOpen] = React.useState(true);

  
  const handleClose = () => {
    setOpen(false);
  };

  const {
    callAccepted,
    userName,
    isReceivingCall,
    answerCall,
  } = useContext(SocketContext);
  const classes = useStyles();


  return (
    <div className={classes.root}>
      {isReceivingCall && !callAccepted && (
        <Dialog open={open} className={classes.dialog}>
          <DialogContent className={classes.dialog}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.middle}>
                  {userName} is calling...
                </Typography>
              </Grid>
              <Grid item xs={12} className={classes.middle}>
                <AccountCircleIcon style={{ fontSize: 100 }} />
              </Grid>
              <Grid item xs={12} className={classes.answer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    answerCall();
                    handleClose();
                  }}
                  startIcon={<CallIcon />}
                >
                  Answer
                </Button>

                <Grid xs={12} className={classes.buttons}>
                  <VideoOnOffButton />
                  <MicOnOffButton />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
