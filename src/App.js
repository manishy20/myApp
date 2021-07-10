import React from "react";
import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Chat from "./components/Chat";
import Header from "./components/Header";
import AnswerDialogBox from "./components/AnswerDialogBox";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "grid",
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justify: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  appBar: {
    margin: 0,
    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1 / 2",
    },
  },

  chat: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: theme.spacing(1),
    gridRow: "2 / 4",
    gridColumn: "3 / 4",
    marginRight: "3px",
    [theme.breakpoints.down("md")]: {
      gridRow: "3 / 4",
      gridColumn: "1 / 2",
      width: "90%",
    },
  },
  options: {
    display: "flex",
    gridColumn: "1 / 3",
    gridRow: "3 / 4",
    justifyContent: "center",
    alignContent: "center",

    [theme.breakpoints.down("md")]: {
      gridRow: "4 / 5",
      gridColumn: "1 / 2",
      width: "90%",
    },
  },
  video: {
    gridColumn: "1 / 3",
    gridRow: "2 / 3",
    [theme.breakpoints.down("xs")]: {
      gridColumn: "1 / 2",
      gridRow: "2 / 3",
      width: "80%",
    },
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container className={classes.gridContainer}>
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

        <Grid item className={classes.options}>
          <Options />
        </Grid>
        <Grid>
          <AnswerDialogBox />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
