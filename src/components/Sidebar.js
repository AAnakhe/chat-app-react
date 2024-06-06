import React from 'react';
import Chats from '../icons/humbleicons--chats.png'
import Friends from '../icons/fa-solid--user-friends .png'
import Outline from'../icons/ion--call-outline.png'
import Owl from'../icons/twemoji--owl.png'
import Settings from'../icons/ic--twotone-settings.png'
import Logout from'../icons/heroicons-outline--logout.png'


function Sidebar() {
  return (
    <div className="sidebar" id="sidebar">
      <div className="parrot-icons" id="parrot-icons">
        <img className="parrot" src={Owl} id="parrot" alt="Parrot Icon" />
      </div>
      <div className="sb-icons" id="sb-icons">
        <img className="parrot" src={Chats} alt="Chat Icon" />
      </div>
      <div className="sb-icons">
        <img className="parrot" src={Friends} alt="Friends Icon" />
      </div>
      <div className="sb-icons">
        <img className="parrot" src={Outline} alt="Call Icon" />
      </div>
      <div className="sb-icons">
        <img className="parrot" src={Settings} alt="Settings Icon" />
      </div>
      <div className="sb-icons">
        <img className="parrot" src={Logout} alt="Logout Icon" />
      </div>
    </div>
  );
}

export default Sidebar;
