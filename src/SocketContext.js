import React, { useEffect, useRef, useState, createContext } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
const SocketContext = createContext();

const socket = io.connect("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [isReceivingCall, setReceivingCall] = useState(false);
  const [connected, setConnected] = useState(false);
  const [caller, setCaller] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [videoButton, setVideoButton] = useState(true);
  const [micButton, setMicButton] = useState(true);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("connection", (id) => {
      connection(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setUserName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("message", (message) => {
      if (message.body !== "") {
        receivedMessage(message);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      from: me,
      to: idToCall,
    };

    setMessage("");
    socket.emit("send message", messageObject);
  }

  function callConnect(id) {
    const idObject = {
      from: me,
      id: id,
    };
    socket.emit("connection request", idObject);
  }

  function connection(id) {
    setIdToCall(id);
    setConnected(true);
    const idObject = {
      from: me,
      id: id,
    };
    socket.emit("connection success", idObject);
  }

  socket.on("success", (id) => {
    setConnected(true);
  });

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("error", (err) => console.log("error", err));

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: idToCall,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const hangUpCall = () => {
    setCallAccepted(false);
    setReceivingCall(false);
    socket.emit("on_disconnect", idToCall);
    connectionRef.current.destroy();
  };

  const leaveMeeting = () => {
    socket.emit("on_leave", idToCall);
    window.location.reload();
  }

  socket.on("userDisconnected", (id) => {
    setCallAccepted(false);
    setReceivingCall(false);
  });

   socket.on("userLeft", (id) => {
 window.location.reload();
   });

  return (
    <SocketContext.Provider
      value={{
        caller,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        setStream,
        name,
        setName,
        me,
        callUser,
        hangUpCall,
        answerCall,
        isReceivingCall,
        message,
        messages,
        sendMessage,
        setMessage,
        setVideoButton,
        videoButton,
        idToCall,
        setIdToCall,
        setMicButton,
        micButton,
        callConnect,
        connected,
        setConnected,
        userName,
        setUserName,
        leaveMeeting,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
