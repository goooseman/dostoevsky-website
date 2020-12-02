import React from "react";
import Accordion, { AccordionNode } from "./Accordion";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Accordion", component: Accordion };

const Container: React.FC<Partial<
  React.ComponentProps<typeof AccordionNode>
>> = (props: Partial<React.ComponentProps<typeof AccordionNode>>) => (
  <div style={{ width: 500, margin: "50px" }}>
    <Accordion>
      <AccordionNode
        onClick={handleClick}
        variant="primary"
        title="One"
        {...props}
        isOpened
      >
        <p>This content is hidden under title One</p>
      </AccordionNode>
      <AccordionNode
        onClick={handleClick}
        variant="primary"
        title="Two"
        {...props}
        isOpened={false}
      >
        <p>This content is hidden under title Two</p>
      </AccordionNode>
    </Accordion>
  </div>
);

const handleClick = action("onClick");

export const withVariantPrimary = (): React.ReactNode => <Container />;

export const withVariantSecondary = (): React.ReactNode => (
  <Container variant="secondary" />
);

export const withVariantHorizontal = (): React.ReactNode => (
  <Container variant="horizontal" />
);
