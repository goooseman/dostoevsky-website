import React, { PureComponent } from "react";
import Table from "./Table";
import { saveAs } from "file-saver";
import iconv from "iconv-lite";

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
    const csvContent = "раз\tдва\tтри\nСтатья\t1\t2";
    const blob = new Blob([
      new Uint8Array(iconv.encode(csvContent, "utf16-le", { addBOM: true })),
    ]);
    saveAs(blob, this.props.downloadFilename);
  };
}

export default TableContainer;
