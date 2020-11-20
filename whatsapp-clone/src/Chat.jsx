import {
  AttachFile,
  InsertEmoticon,
  Message,
  MessageSharp,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";
import "./Chat.scss";

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.messages);
    return (
      <div className="chat">
        <div className="chat__header">
          <Avatar />
          <div className="chat__headerInfo">
            <h3>Room name</h3>
            <p>Last seen at...</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="chat__body">
          {this.props.messages.map((message) => (
            <p
              className={`chat__message ${
                message.received && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.className}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          ))}
        </div>
        <div className="chat__footer">
          <InsertEmoticon />
          <form>
            <input placeholder="Type a message" type="text" />
            <button type="submit">Send a message</button>
          </form>
          <MicIcon />
        </div>
      </div>
    );
  }
}
export default Chat;
