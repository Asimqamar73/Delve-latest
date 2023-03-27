import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
// import io from "socket.io-client";
import moment from "moment";

// const socket = io();

function Communication() {
  const [message, setMessage] = useState("");
  const [discussion, setDiscussion] = useState([]);

  // useEffect(() => {
  //   socket.on("displayMessage", (msg) => {
  //     setDiscussion((prevState) => [
  //       ...prevState,
  //       { message: msg, sender: socket.id, time: Date.now() },
  //     ]);
  //   });
  // }, []);
  // const handleInput = (event) => {
  //   setMessage(event.target.value);
  // };
  const handleSend = () => {
    // socket.emit("sendMessage", message);
  };
  return <p>Communication</p>;
}

export default Communication;
