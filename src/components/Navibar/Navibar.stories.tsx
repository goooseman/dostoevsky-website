import React from "react";
import Navibar from "./Navibar";

export default { title: "components/Navibar", component: Navibar };

export const asHeader = (): React.ReactNode => <Navibar>Hello, world!</Navibar>;
