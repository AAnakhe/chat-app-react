import React, { useState, useEffect, useCallback} from 'react';
import Sidebar from './Sidebar';
import FriendsMenu from './FriendsMenu';
import ChatBox from './ChatBox';
import WebSocketSingleton from '../utils/WebSocketSingleton';

function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [notifications, setNotifications] = useState({});
  const [contacts, setContacts] = useState([]);
  const username = localStorage.getItem('username');

  const handleMessage = useCallback((sender, message) => {
    setMessages((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      if (!updatedMessages[sender]) {
        updatedMessages[sender] = [];
      }
      updatedMessages[sender].push({ type: 'receiver', text: message.trim() });
      return updatedMessages;
    });

    if (selectedContact !== sender) {
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [sender]: (prevNotifications[sender] || 0) + 1,
      }));
    }
  }, [selectedContact]);


  useEffect(() => {
    if (username) {
      WebSocketSingleton.initialize(username);
      WebSocketSingleton.setOnMessageCallback(handleMessage);
    }
  }, [username, handleMessage]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [contact]: 0,
    }));
  };

  return (
    <div id="chat-container" className="full-interface">
      <Sidebar />
      <FriendsMenu setContacts={setContacts} onSelectContact={handleSelectContact} notifications={notifications} />
      <ChatBox
        selectedContact={selectedContact}
        messages={messages[selectedContact] || []}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatInterface;
