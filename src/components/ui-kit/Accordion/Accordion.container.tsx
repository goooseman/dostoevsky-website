import React, {
  PureComponent,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import Accordion from "./Accordion";

interface AccordionContainerProps {
  children: React.ReactNode;
}

interface AccordionContainerState {
  activeNode: number;
}

class AccordionContainer extends PureComponent<
  AccordionContainerProps,
  AccordionContainerState
> {
  public state: AccordionContainerState = {
    activeNode: 0,
  };

  render(): React.ReactNode {
    const { children } = this.props;
    const { activeNode } = this.state;

    return (
      <Accordion>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) {
            return child;
          }

          return cloneElement(child, {
            isOpened: activeNode === index,
            onClick: this.handleClick(index),
          });
        })}
      </Accordion>
    );
  }

  private handleClick = (index: number) => () => {
    this.setState({ activeNode: index });
  };
}

export default AccordionContainer;
