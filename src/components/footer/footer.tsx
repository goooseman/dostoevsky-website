import React from "react";

interface Props {
  title: string;
}

const Footer: React.FC<Props> = ({ title }: Props) => (
  <div className="footer">
    <div className="container">
      <hr className="border-primary" />
      <p>{title}</p>
    </div>
  </div>
);

export default Footer;
