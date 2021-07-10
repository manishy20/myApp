import React, {useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, PhoneDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    margin: "5px",
  },
  padding: {
    padding: 15,
  },
  paper: {
    padding: "5px",
    border: "2px solid black",
  },
}));

const Sidebar = ({ children }) => {
  const { me,  name, setName,leaveCall,idToCall, setIdToCall, callConnect,connected} =
    useContext(SocketContext);
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.gridContainer}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                  >
                    Copy Your ID
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h6">
                  Make Connection
                </Typography>
                <TextField
                  label="ID to connect"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                  disabled={connected ? true : false}
                />
                {connected ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={true}
                    startIcon={<PhoneDisabled fontSize="large" />}
                    fullWidth
                    onClick={leaveCall}
                    className={classes.margin}
                  >
                    Connected
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => callConnect(idToCall)}
                    className={classes.margin}
                  >
                    Connect
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
          {children}
        </Paper>
      </Container>
    </div>
  );
};

export default Sidebar;
