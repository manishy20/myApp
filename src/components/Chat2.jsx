import React, { useState, useEffect, useRef, useContext } from "react";

import { SocketContext } from "../SocketContext";


const Chat2 = () => {

 const { me, message, messages, sendMessage, setMessage, caller } =
   useContext(SocketContext);

function handleChange(e) {
  setMessage(e.target.value);
}


return (
    <div>
    <div>
        {messages.map((message) => {
            if (message.from === me) {
                return (
                    <div>
                    <p> {message.body}</p>
                    </div>
                )
            }
        })}
        return (
            <div >
                <p>{message.body}</p>
            </div>
        );
    </div>
    <form onsubmit={sendMessage}>
        <input value={message} onChange={handleChange} placeholder="Type Your Message here..."></input>
        <button type="submit" onChage={handleChange}>Send</button>
    </form>
      </div>
)


}

export default Chat2;