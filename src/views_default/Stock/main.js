import React, {Component} from "react";
import StockTable from "./StockTable";

import DashboardForms from "../DashboardForms/main";

const INITIAL_STATE = {
  animTimeText: ""
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <StockTable />
        <DashboardForms />
      </div>
    );
  }
}


export default Main;
