import { RefreshSharp } from "@material-ui/icons";
import React, { useState, useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./index.css";
// const socketUrl = "ws://45.79.127.100:8001/uui";
const socketUrl = "ws://vdoc.ellocent.com/uui";

const WebSocketDemo = () => {
    //Public API that will echo messages sent to it back to the client
    const messageHistory = useRef([]);
    // const inputref = useRef([]);
    const { sendMessage, lastMessage, readyState, getWebSocket } =
        useWebSocket(socketUrl);
    const [message, setMessage] = React.useState();
    messageHistory.current = useMemo(
        () => messageHistory.current.concat(lastMessage),
        [lastMessage]
    );

    // const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting...",
        [ReadyState.OPEN]: "Connected",
        [ReadyState.CLOSING]: "Disconnecting...",
        [ReadyState.CLOSED]: "Disconnected",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];

    const handleSendMsg = (e) => {
        // inputref.current.value.reset();
        var formData = new FormData(e.currentTarget);
      
        e.preventDefault();
       const msg = formData.get("msg");
        console.log("check message", msg);
        console.log("formdata++",formData);
        if (msg){
          sendMessage(msg, 1, "developer");
           }
       
       
    };
    return (
        <div className="chat-box">
            <span className="title">
                The WebSocket is currently{" "}
                <b
                    className={connectionStatus
                        .replace("...", "")
                        .toLocaleLowerCase()}
                >
                    {connectionStatus}
                </b>
            </span>
          
            <ul className="chat-content">
                {console.log("messageList", messageHistory)}
                {messageHistory.current.map((message, idx) =>
                    message ? <li key={idx}>{message.data}</li> : null
                )}
            </ul>
            <div className="title">
                <form onSubmit={handleSendMsg} className="chat-form">
                    <input name="msg" required className="chat-input"/>
                    <button type="submit" className="chat-button">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};
export default WebSocketDemo;
