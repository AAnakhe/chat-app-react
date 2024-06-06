import React, { useState, useEffect } from 'react';
import Search from '../icons/tabler--search.png';
import Archive from '../icons/ic--outline-archive.png';
import AddContact from './AddContact';

const FriendsMenu = ({ onSelectContact, notifications, setContacts }) => {
  const [localContacts, setLocalContacts] = useState([]);

  useEffect(() => {

    const fetchContacts = async (username) => {
      try {
        const response = await fetch(`http://localhost:3010/get_contacts/${username}`);
        const result = await response.json();
        console.log('Fetched contacts:', result);
  
        if (response.ok && result.status) {
          setLocalContacts(result.data || [])
          setContacts(result.data || []);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    const username = localStorage.getItem('username');
    if (username) {
      fetchContacts(username);
    }
  }, [setContacts]);

  const handleContactAdded = (newContact) => {
    setLocalContacts((prevContacts) => [...prevContacts, newContact]);
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };


  return (
    <div className="friends-menu" id="friends-menu">
      <p className="chat-header" id="chat-header">Chats</p>
      <div className="search-area" id="search-area">
        <div className="search-button" id="search-button">
          <img className="search-icon" src={Search} id="search-icon" alt="Search Icon" />
        </div>
        <input className="search-bar" placeholder="Search..." id="search-bar" />
      </div>
      <div className="archive-area" id="archive-area">
        <div className="archive-button">
          <img className="archive-icon" src={Archive} alt="Archive Icon" id='archive-icon'/>
        </div>
        <p className="archive-text" id='archive-text'>Archive</p>
      </div>
      <AddContact onContactAdded={handleContactAdded} />
      <div className="contacts-list" id='contact-list'>
        {localContacts.length > 0 ? (
          localContacts.map((contact, index) => (
            <div key={index} className="chat-snippet" onClick={() => onSelectContact(contact)}>
              <div className="chat-dp">
                {/* <img className="cdp" src={`https://api.dicebear.com/8.x/lorelei/${contact}.svg`} alt={contact} /> */}
              </div>
              <div className="chat-details">
                <p className="chat-name">{contact}</p>
                <p className="chat-content">Last message or status...</p>
                {notifications[contact] > 0 && (
                  <span className="notification-icon">{notifications[contact]}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </div>
  );
};

export default FriendsMenu;
