import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./SidebarChat.scss";

class SidebarChat extends React.Component {
  render() {
    return (
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h2>Room name</h2>
          <p>This is the last message</p>
        </div>
      </div>
    );
  }
}
export default SidebarChat;
