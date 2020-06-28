import React, { useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import emergence from "emergence.js";

import Navibar from "../navibar/navibar";
import Footer from "../footer/footer";
import { siteMetadata } from "../../../gatsby-config";

import "modern-normalize/modern-normalize.css";
import "prismjs/themes/prism.css";
import "src/scss/gatstrap.scss";
import "animate.css/animate.css";
import "font-awesome/css/font-awesome.css";

interface Props {
  children?: React.ReactNode;
  location: Location;
}

const Layout: React.FC<Props> = ({ children, location }: Props) => {
  useEffect(() => {
    emergence.init();
  });

  return (
    <div>
      <Navibar title={siteMetadata.title} location={location} />
      {children}
      <Footer title={siteMetadata.title} author={siteMetadata.author} />
    </div>
  );
};

export default Layout;
