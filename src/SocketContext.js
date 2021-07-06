import React, { useEffect, useRef, useState, createContext } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./App.css";

const SocketContext = createContext();

const socket = io.connect("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [isReceivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [userIdToCall, setUserIdToCall] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [videoButton, setVideoButton] = useState(true);
  const [micButton, setMicButton] = useState(true);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true})
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
    
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    socket.on("message", (message) => {
      if (message.body !== "") {
        receivedMessage(message);
        if (message.from != me) setUserIdToCall(message.from);
      }
    });
  }, []);


  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      from: me,
      to: idToCall || userIdToCall,
    };

    setMessage("");
    socket.emit("send message", messageObject);
  }

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
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
    setUserIdToCall(caller);
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

  const leaveCall = () => {
    setCallEnded(true);
    setCallAccepted(false);
    setReceivingCall(false);
    connectionRef.current.destroy();
    // window.location.reload();
  };

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
        leaveCall,
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
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
