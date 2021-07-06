import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import ReactEmoji from "react-emoji";

import { SocketContext } from "../SocketContext";



const Page = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: white;
  flex-direction: column;
`;

const Container = styled.div`
width: 95%%;
 
  height: 480px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

const Input = styled.input`
  width: 95%;
  height: 50px;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: black;
  letter-spacing: 1px;
  word-break: break-word;
  ${"" /* line-height: 20px; */}
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: #005cbf;
  margin: 5px;
  width: 97%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: white;
  font-size: 17px;
`;

const Form = styled.form`
  width: 100%;
  padding: 5px;
  align-items: bottom center;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  overflow-wrap: break-word;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: #3395ff;
  color: white;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: #EAEAEA;
  color: black;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const App = () => {
    const { me, message, messages, sendMessage,setMessage,caller } =
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
    <Page>
      <Container>
        {messages.map((message, index) => {
          if (message.from === me) {
            return (
              <MyRow key={index}>
                <MyMessage>{ReactEmoji.emojify(message.body)}</MyMessage>
              </MyRow>
            );
          } else
            return (
              <PartnerRow key={index}>
                <PartnerMessage>
                  {ReactEmoji.emojify(message.body)}
                </PartnerMessage>
              </PartnerRow>
            );
        })}
        <div ref={messagesEndRef} />
      </Container>
      <Form onSubmit={sendMessage}>
        <Input
          value={message}
          onChange={handleChange}
          onKeyPress={(e) => e.key === "Enter" && { sendMessage }}
          placeholder="Say something..."
        />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default App;
