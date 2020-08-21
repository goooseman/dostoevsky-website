import React, { useState } from "react";
import TableRow from "./TableRow";

interface TableRowContainerProps
  extends Omit<React.ComponentProps<typeof TableRow>, "isOpened" | "onClick"> {}

const TableRowContainer: React.SFC<TableRowContainerProps> = (
  props: TableRowContainerProps
) => {
  const [isOpened, setOpened] = useState<boolean>(true);
  const toggleOpened = () => setOpened((v) => !v);
  return <TableRow {...props} isOpened={isOpened} onClick={toggleOpened} />;
};
export default TableRowContainer;
