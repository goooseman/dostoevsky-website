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
    let activeNode = props.isOpened ? 0 : -1;
    if (window.location.hash && props.isOpened) {
      activeNode =
        Children.toArray(props.children).findIndex((child) => {
          if (!isValidElement(child)) {
            return false;
          }
          if (child.props.slug === window.location.hash.replace("#", "")) {
            return true;
          }
          return false;
        }) || 0;
    }
    this.state = {
      activeNode,
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
            onClick: this.handleClick(index, child.props.slug),
          });
        })}
      </Accordion>
    );
  }

  private handleClick = (index: number, slug?: string) => () => {
    if (slug) {
      const isOpened = this.state.activeNode === index;
      if (isOpened) {
        window.location.hash = "";
      } else {
        window.location.hash = slug;
      }
    }
    this.setState((state: AccordionContainerState) => ({
      activeNode: state.activeNode === index ? -1 : index,
    }));
  };
}

export default AccordionContainer;
