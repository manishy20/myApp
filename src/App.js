import React from "react";
import { Typography, AppBar, Toolbar, Grid, Box , Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import Chat from "./components/Chat";
import Header from "./components/Header";

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: 0,
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
  },
  wrapper: {
    display: "grid",
    gridGap: "5px",
    gridTemplateColumns: "550px 550px auto ",
    gridTemplateRow: "100 600px auto",
    alignContent: "center",
  },

  chat: {
    background: "white",
    justifyContent: "center",
    gridRow: "2 / 4",
    gridColumn: "3 / 4",
    marginRight: "3px",
  },
  sidebar: {
    display: "flex",
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
    justifyContent: "center",
    alignContent: "center",
  },
  video: {
    gridColumn: "1 / 3",
    gridRow: "2 / 3",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.wrapper}>

        <Grid item className={classes.appBar}>
          <Header />
        </Grid>

        <Grid item className={classes.video}>
          <VideoPlayer />
        </Grid>

        <Grid item className={classes.chat}>
          <Box boxShadow={1} border={2}>
            <Chat />
          </Box>
        </Grid>

        <Grid item className={classes.sidebar}>
          <Sidebar>
            <Notifications />
          </Sidebar>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
