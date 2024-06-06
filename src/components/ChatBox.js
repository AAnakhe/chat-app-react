import React, { useState, useEffect, useRef } from 'react';
import Prince from '../icons/prince.jpg';
import Call from '../icons/ion--call-outline.png';
import Video from '../icons/bx--video.png';
import Search from '../icons/tabler--search.png';
import Fill from '../icons/mingcute--down-fill.png';
import WebSocketSingleton from '../utils/WebSocketSingleton';

function ChatBox({ selectedContact, messages, setMessages }) {
  const [receiver, setReceiver] = useState('');
  const messageInputRef = useRef(null);

  useEffect(() => {
    setReceiver(selectedContact);
  }, [selectedContact]);

  const sendMessage = () => {
    const messageInput = messageInputRef.current.value.trim();

    if (selectedContact && messageInput) {
      const messageToSend = `${selectedContact}:${messageInput}`;
      console.log('Sending message:', messageToSend);
      if (WebSocketSingleton) {
        WebSocketSingleton.sendMessage(messageToSend);

        setMessages((prevMessages) => {
          const updatedMessages = { ...prevMessages };
          if (!updatedMessages[receiver]) {
            updatedMessages[receiver] = [];
          }
          updatedMessages[receiver].push({id: Date.now(), type: 'sender', text: messageInput });
          return updatedMessages;
        });

        messageInputRef.current.value = '';
      } else {
        console.error('WebSocket connection not established');
      }
    } else {
      console.error('Invalid receiver name or message input');
    }
  };

  return (
    <div className="chat-box" id="chat-box">
      <div className="cb-header">
        <div className="friend-name">
          <img className="cb-dp" src={Prince} id="cb-dp" alt="Friend" />
          <div className="fdp" id="fdp">
            <p className="friend-username">{receiver || "Select a contact"}</p>
            <p className="friend-status">Online</p>
          </div>
        </div>
        <div className="chatbox-icons" id="chatbox-icons">
          <img className="cb-icons" src={Video} id="cb-icons" alt="Video" />
          <img className="cb-icons" src={Call} alt="Call" />
          <img className="cb-icons" src={Search} alt="Search" />
          <img className="cb-icons" src={Fill} alt="More" />
        </div>
      </div>
      <div className="cb-body" id="cb-body">
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.type}`}>{msg.text}</div>
        ))}
      </div>
      <div className="cb-footer">
        <input ref={messageInputRef} className="message" placeholder="Message" />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
