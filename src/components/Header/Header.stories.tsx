import React from "react";
import Header from "./Header";

export default { title: "components/Header", component: Header };

export const asHeader = (): React.ReactNode => <Header>Hello, world!</Header>;
