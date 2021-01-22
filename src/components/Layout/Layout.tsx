import React from "react";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import "src/styles/global.css";
import { LocaleProvider } from "src/contexts/LocaleProvider";

interface Props {
  children?: React.ReactNode;
  hasPageLayout?: boolean;
  location: Location;
}

const Layout: React.FC<Props> = ({
  children,
  hasPageLayout = true,
  location,
}: Props) => {
  return (
    <LocaleProvider location={location}>
      {hasPageLayout ? <Header /> : null}
      {children}
      {hasPageLayout ? <Footer /> : null}
    </LocaleProvider>
  );
};

export default Layout;
