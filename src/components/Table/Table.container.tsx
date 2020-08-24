import React, { PureComponent } from "react";
import Table from "./Table";
import { saveAs } from "file-saver";
import iconv from "iconv-lite";

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
    const csvContent = this.getCsv();
    const blob = new Blob([
      new Uint8Array(iconv.encode(csvContent, "utf16-le", { addBOM: true })),
    ]);
    saveAs(blob, `${this.props.downloadFilename}.csv`);
  };

  private getCsv = (): string => {
    const { tables } = this.props;
    const { activeTableIndex } = this.state;
    const table = tables[activeTableIndex];
    let result = "";
    result += this.getCsvRow(table.columns.map((c) => c.title));
    for (const row of table.rows) {
      result += this.getCsvRow(row.values.map((v) => v.value));
    }
    return result;
  };

  private getCsvRow = (row: string[]) => {
    return row.join("\t") + "\n";
  };

  private hanldeTableTitleClick = (index: number) => () => {
    this.setState({
      activeTableIndex: index,
    });
  };
}

export default TableContainer;
