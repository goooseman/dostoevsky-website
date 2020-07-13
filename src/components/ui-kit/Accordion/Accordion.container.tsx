import React, {
  PureComponent,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import Accordion from "./Accordion";

interface AccordionContainerProps {
  children: React.ReactNode;
  isOpened: boolean;
}

interface AccordionContainerState {
  activeNode: number;
}

class AccordionContainer extends PureComponent<
  AccordionContainerProps,
  AccordionContainerState
> {
  public static defaultProps = {
    isOpened: true,
  };

  public constructor(props: AccordionContainerProps) {
    super(props);
    this.state = {
      activeNode: props.isOpened ? 0 : -1,
    };
  }

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
    this.setState((state: AccordionContainerState) => ({
      activeNode: state.activeNode === index ? -1 : index,
    }));
  };
}

export default AccordionContainer;
