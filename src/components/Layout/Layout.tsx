import React from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import "src/styles/global.css";
import { LocaleProvider } from "src/contexts/LocaleProvider";
import { TooltipMount } from "../ui-kit/Tooltip";
import classes from "./Layout.module.css";
import cn from "clsx";

interface Props {
  children?: React.ReactNode;
  hasPageLayout?: boolean;
  hasBigHeader?: boolean;
  location: Location;
}

const Layout: React.FC<Props> = ({
  children,
  hasPageLayout = true,
  hasBigHeader = false,
  location,
}: Props) => {
  return (
    <div className={cn(classes.minMain)}>
      <LocaleProvider location={location}>
        {hasPageLayout ? (
          <Header isBig={hasBigHeader} location={location} />
        ) : null}
        {children}
        {hasPageLayout ? <Footer /> : null}
        <TooltipMount />
      </LocaleProvider>
    </div>
  );
};

export default Layout;
