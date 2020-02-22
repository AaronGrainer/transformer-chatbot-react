import React, { Component } from 'react'
import { connect } from "react-redux";
import { stock } from "../../redux/actions";
import {
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { tableInitConfig, timeToUnixIfAvailable } from "../../helper";
import { getCommonStockColumn, getCommonStockUpdate, getColumnDropdownMenu } from "../helper"

import TableComponent from "../CommonComponent/TableComponent"

class StockTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...tableInitConfig,
      columns: [],
      loading: false
    };
    this.renderDropdownItem = this.renderDropdownItem.bind(this)
  }

  listStock = async (size, start, search) => {
    const { listStock } = this.props;

    this.setState({ loading: true });
    await listStock({ size, start, search });
    this.setState({ loading: false });
  };

  handleUpdate = event => {
    const {
      toggleUpdateStock,
      updateStockToggle,
      tableItems,
      updateStockParameters
    } = this.props;

    var data = tableItems.find(element => {
      return element.stockDataID == event.target.id
    });
    if (updateStockToggle == false) {
      updateStockParameters({
        ...getCommonStockUpdate(data)
      });
    }
    toggleUpdateStock(1);
  };

  handleDelete = event => {
    const {
      toggleDeleteStock,
      deleteStockToggle,
      deleteStockParameters
    } = this.props;

    if (deleteStockToggle == false) {
      deleteStockParameters({
        stockDataID: event.target.id
      });
    }
    toggleDeleteStock(1);
  };

  handleDetail = event => {
    const {
      toggleDetailStock,
      detailStockToggle,
      tableItems,
      detailStockParameters
    } = this.props;

    var data = tableItems.find(element => {
      return element.stockDataID == event.target.id
    });
    if (detailStockToggle == false) {
      detailStockParameters({
        ...getCommonStockUpdate(data)
      });
    }
    toggleDetailStock(1);
  };

  renderTableColumns() {
    const renderDropdownItem = this.renderDropdownItem

    var columns = [
      getColumnDropdownMenu({ renderDropdownItem }),
      ...getCommonStockColumn(),
    ];

    this.setState({ columns });
  }

  renderDropdownItem(event) {
    const { stockDataID } = event.original;
    const handleUpdate = this.handleUpdate
    const handleDelete = this.handleDelete

    const render = [
      <DropdownItem id={stockDataID} tag="a" onClick={handleUpdate}>
        Update
      </DropdownItem>,
      <DropdownItem id={stockDataID} tag="a" onClick={handleDelete}>
        Delete
      </DropdownItem>
    ];

    return <DropdownMenu>{render}</DropdownMenu>;
  }

  getTdProps = (state, rowInfo, column, instance) => {
    // const handleDisplayCustomer = this.handleDisplayCustomer;    
    if (column.id != "dropdownMenu") {
      return {
        onClick: e => {
          if (rowInfo) {
            const { stockDataID } = rowInfo.original;
            let event = { target: { id: stockDataID } };
            this.handleDetail(event)
          }
        },
        style: { cursor: "pointer" }
      };
    } else {
      return {
        style: { cursor: "pointer", overflow: "visible" }
      };
    }
  };

  componentDidMount() {
    const { pageSize } = this.state
    this.renderTableColumns();
    this.listStock(pageSize);
  }

  render() {
    const { columns, loading } = this.state;
    const {
      tableItems,
      startSnapshot,
      searching,
      toggleCreateStock
    } = this.props;
    const getTdProps = this.getTdProps;
    const listStock = this.listStock;

    const tableDetails = {
      toggleCreate: toggleCreateStock,
      getTdProps: getTdProps,
      listItems: listStock,
      searchName: "Search by Number Plate",
      columns,
      tableItems,
      startSnapshot,
      searching,
      loading: loading
    };

    return (
      <div>
        <TableComponent tableDetails={tableDetails} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tableItems: state.stock.tableItems,
  startSnapshot: state.stock.startSnapshot,
  searching: state.stock.searching,
  updateStockToggle: state.stock.updateStockToggle,
  deleteStockToggle: state.stock.deleteStockToggle,
  detailStockToggle: state.stock.detailStockToggle
});

const mapDispatchToProps = {
  listStock: stock.listStock,
  toggleCreateStock: stock.toggleCreateStock,
  toggleUpdateStock: stock.toggleUpdateStock,
  toggleDeleteStock: stock.toggleDeleteStock,
  toggleDetailStock: stock.toggleDetailStock,
  updateStockParameters: stock.updateStockParameters,
  deleteStockParameters: stock.deleteStockParameters,
  detailStockParameters: stock.detailStockParameters
};

export default connect(mapStateToProps, mapDispatchToProps)(StockTable);