import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../components/Context';

const Chat = () => {
  //const localIp = "http://127.0.0.1:8000";
  const localIp = "https://fb-chat-backend.herokuapp.com";
  var eventSource = undefined;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatLastMessageId, setChatLastMessageId] = useState(-1);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    eventSource = new EventSource(localIp + "/chat-messages");

    eventSource.onopen = (event) => {
      console.log("SSE connection opened");
    }

    eventSource.onmessage = (event) => {
      const receivedMessages = JSON.parse(event.data);
      const receivedLastId = receivedMessages[receivedMessages.length - 1].id;

      if(receivedLastId != chatLastMessageId){
        setMessages(receivedMessages);
        setChatLastMessageId(receivedLastId);
        updateScroll();
      }
    }

    eventSource.onerror = (event) => {
      console.log(event.target.readyState);

      if (event.target.readyState === EventSource.CLOSED) {
        console.log('SSE connection closed (' + event.target.readyState + ')')
      }

      eventSource.close();
    }

    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    }

  }, [chatLastMessageId])

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const saveMessage = (e) => {
    if (e.key === "Enter") {
      setNewMessage("");

      fetch(localIp + '/messages', {
        method: 'POST',
        body: JSON.stringify({
          userId: auth.userId,
          username: auth.username,
          text: e.target.value
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      });
    }
  }

  const updateScroll = () => {
    var element = document.getElementById("chat-container");
    element.scrollTop = element.scrollHeight;
  }

  return (
    <center>
      <div className="col-12 col-sm-4">
        <div className="form-row">
          <div className="col-12">
            <center><h1>Chat</h1></center>
            <div id="chat-container">
              {messages.map((message ,index) => {
                const own = message.userId == auth.userId;
                const date = new Date(message.datetime);
                const dayText = date.toLocaleString("default", { weekday: "short" });
                const datetime = dayText + " " + date.getDate() + ", " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

                return (
                  <div key={index}>
                    <div className={own ? "chat-own-line" : ""}><p className="chat-message-title">{own ? "You" : message.username}</p></div>
                    <div className={own ? "chat-own-line" : ""}><p>{message.text}</p></div>
                    <div className={own ? "chat-own-line" : ""}><p className="chat-message-date">{datetime}</p></div>
                    <hr></hr>  
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-12">
            <div className="input-field">
              <input type="text" name="newMessage" placeholder="Write something..." value={newMessage} onChange={handleNewMessage} onKeyPress={saveMessage}></input>
            </div>
          </div>
        </div>
      </div>
    </center>
  )
}

export default Chat