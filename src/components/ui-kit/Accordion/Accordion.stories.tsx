import React, { PropsWithChildren } from "react";
import Accordion, { AccordionNode } from "./Accordion";
import { action } from "@storybook/addon-actions";

export default { title: "components/ui-kit/Accordion", component: Accordion };

const Container: React.FC<PropsWithChildren<{}>> = (
  props: PropsWithChildren<{}>
) => (
  <div style={{ width: 500, margin: "50px" }}>
    <Accordion>{props.children}</Accordion>
  </div>
);

const handleClick = action("onClick");

export const withLevelOne = (): React.ReactNode => (
  <Container>
    <AccordionNode onClick={handleClick} variant="primary" title="One" isOpened>
      <p>This content is hidden under title One</p>
    </AccordionNode>
    <AccordionNode
      onClick={handleClick}
      variant="primary"
      title="Two"
      isOpened={false}
    >
      <p>This content is hidden under title Two</p>
    </AccordionNode>
  </Container>
);

export const withLevelTwo = (): React.ReactNode => (
  <Container>
    <AccordionNode
      onClick={handleClick}
      variant="secondary"
      title="One"
      isOpened
    >
      <p>This content is hidden under title One</p>
    </AccordionNode>
    <AccordionNode
      onClick={handleClick}
      variant="secondary"
      title="Two"
      isOpened={false}
    >
      <p>This content is hidden under title Two</p>
    </AccordionNode>
  </Container>
);
