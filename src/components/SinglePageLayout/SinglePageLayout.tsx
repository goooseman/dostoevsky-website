import React from "react";
import classes from "./SinglePageLayout.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import { T } from "react-targem";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const SinglePageLayout: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <main className={cn(classes.container)}>
      {title && (
        <Typography variant="h1" font="serif" className={cn(classes.pageTitle)}>
          <T message={title} />
        </Typography>
      )}
      <div>{children}</div>
    </main>
  );
};

export default SinglePageLayout;
