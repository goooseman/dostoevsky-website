import React, { PureComponent } from "react";
import Table from "./Table";
import { saveAs } from "file-saver";
import windows1252 from "windows-1252";

interface TableContainerProps
  extends Omit<React.ComponentProps<typeof Table>, "onDownloadButtonClick"> {}
interface TableContainerState {}

class TableContainer extends PureComponent<
  TableContainerProps,
  TableContainerState
> {
  render(): React.ReactNode {
    return (
      <Table
        onDownloadButtonClick={this.handleDownloadButtonClick}
        {...this.props}
      ></Table>
    );
  }

  private handleDownloadButtonClick = () => {
    const encodedData = windows1252.encode("раз;два;три\nСтатья\n1;2");
    const blob = new Blob([encodedData], {
      type: "text/csv;charset=windows-1252;",
    });
    saveAs(blob, this.props.downloadFilename);
  };
}

export default TableContainer;
