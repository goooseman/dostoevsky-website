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
    if (
      typeof window !== `undefined` &&
      window.location.hash &&
      props.isOpened
    ) {
      activeNode = this.getActiveNodeFromHash();
    }
    this.state = {
      activeNode,
    };
  }

  public componentDidMount(): void {
    if (typeof window === `undefined`) {
      return;
    }
    window.addEventListener("hashchange", this.handleHashChangeEvent);
  }

  public componentWillUnmount(): void {
    if (typeof window === `undefined`) {
      return;
    }
    window.removeEventListener("hashchange", this.handleHashChangeEvent);
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

  private getActiveNodeFromHash = () => {
    const activeNode = this.state ? this.state.activeNode : 0;
    const activeNodeIndex = Children.toArray(this.props.children).findIndex(
      (child) => {
        if (!isValidElement(child)) {
          return false;
        }
        if (window.location.hash.replace("#", "").includes(child.props.slug)) {
          return true;
        }
        return false;
      }
    );
    return activeNodeIndex || activeNode;
  };

  private handleHashChangeEvent = () => {
    if (!window.location.hash) {
      return;
    }
    this.setState({
      activeNode: this.getActiveNodeFromHash(),
    });
  };

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
