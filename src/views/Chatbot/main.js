import React, {Component} from "react";
import ChatWindow from "./ChatWindow";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <ChatWindow />
      </div>
    );
  }
}


export default Main;
