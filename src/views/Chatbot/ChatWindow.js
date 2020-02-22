import React, { Component } from 'react'
import { connect } from "react-redux";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget"

import "react-chat-widget/lib/styles.css"
import logo from "../../logo.svg"

class ChatWindow extends Component {
  constructor(props) {
    super(props)
  }

  handleNewUserMessage = newMessage => {
    addResponseMessage("Welcome to this awesome chat!")
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Transformer"
          subtitle="GPT-2"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);