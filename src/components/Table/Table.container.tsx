import React, { PureComponent } from "react";
import Table from "./Table";
import { saveAs } from "file-saver";
import { getCsv } from "src/utils/csv";

interface TableContainerProps
  extends Omit<
    React.ComponentProps<typeof Table>,
    "onDownloadButtonClick" | "onTableTitleClick" | "activeTableIndex"
  > {}
interface TableContainerState {
  activeTableIndex: number;
}

class TableContainer extends PureComponent<
  TableContainerProps,
  TableContainerState
> {
  public state: TableContainerState = {
    activeTableIndex: 0,
  };

  render(): React.ReactNode {
    return (
      <Table
        onDownloadButtonClick={this.handleDownloadButtonClick}
        activeTableIndex={this.state.activeTableIndex}
        onTableTitleClick={this.hanldeTableTitleClick}
        {...this.props}
      ></Table>
    );
  }

  private handleDownloadButtonClick = () => {
    const { tables } = this.props;
    const { activeTableIndex } = this.state;
    const csvContent = getCsv(tables, activeTableIndex);
    saveAs(csvContent, `${this.props.downloadFilename}.csv`);
  };

  private hanldeTableTitleClick = (index: number) => () => {
    this.setState({
      activeTableIndex: index,
    });
  };
}

export default TableContainer;
