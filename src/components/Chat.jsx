import React, { useEffect, useRef, useContext } from "react";
import ReactEmoji from "react-emoji";
import { Button, Input, makeStyles } from "@material-ui/core";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
  },

  container: {
    width: "95%",
    height: "480px",
    maxHeight: "500px",
    overflow: "auto",
    border: "1px solid lightgray",
    borderRadius: "5px",
    padding: "5px",
    marginTop: "5px",
  },

  input: {
    width: "98%",
    height: "50px",
    borderRadius: "10px",
    paddingLeft: "10px",
    margin: "5px",
    backgroundColor: "transparent",
    border: "1px solid lightgray",
    outline: "none",
    color: "black",
    wordBreak: "break-word",
  },

  button: {
    margin: "5px",
    width: "97%",
    border: "none",
    height: "50px",
    borderRadius: "10px",
    color: "white",
    fontSize: "17px",
  },

  form: {
    width: "100%",
    padding: "5px",
    alignItems: "bottom center",
  },

  myRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    overflowWrap: "break-word",
  },

  myMessage: {
    width: "45%",
    backgroundColor: "#3395ff",
    color: "white",
    padding: "10px",
    marginRight: "5px",
    textAlign: "center",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  },

  partnerRow: {
    width: "100%",
    display: "flex",
    marginTop: "10px",
    overflowWrap: "break-word",
    justifyContent: "flex-start",
  },

  partnerMessage: {
    width: "45%",
    backgroundColor: "#EAEAEA",
    color: "black",
    border: "1px solid lightgray",
    padding: "10px",
    marginLeft: "5px",
    textAlign: "center",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
}));

const Chat = () => {
  const classes = useStyles();

  const { me, message, messages, sendMessage, setMessage } =
    useContext(SocketContext);

  function handleChange(e) {
    setMessage(e.target.value);
  }

  //scroll to end when new msg send or recieved
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        {messages.map((message) => {
          if (message.from === me) {
            return (
              <div className={classes.myRow}>
                <div className={classes.myMessage}>
                  {ReactEmoji.emojify(message.body)}
                </div>
              </div>
            );
          } else
            return (
              <div className={classes.partnerRow}>
                <div className={classes.partnerMessage}>
                  {ReactEmoji.emojify(message.body)}
                </div>
              </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className={classes.form}>
        <Input
          className={classes.input}
          value={message}
          fullWidth
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && { sendMessage }}
          placeholder="Type Your Message here..."
        ></Input>
        <Button
          className={classes.button}
          variant="contained"
          fullWidth
          color="primary"
          onClick={sendMessage}
          type="button"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
