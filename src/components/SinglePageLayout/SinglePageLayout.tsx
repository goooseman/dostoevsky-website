import React from "react";
import classes from "./SinglePageLayout.module.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const SinglePageLayout: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <main className={cn(classes.container)}>
      {title && (
        <Typography variant="h1" font="serif" className={cn(classes.pageTitle)}>
          {title}
        </Typography>
      )}
      <div>{children}</div>
    </main>
  );
};

export default SinglePageLayout;
