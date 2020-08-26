import React, { PureComponent } from "react";
import SpoilerText from "./SpoilerText";

interface SpoilerTextContainerProps {
  text: React.ReactNode;
}

interface SpoilerTextContainerState {
  isOpened: boolean;
}

class SpoilerTextContainer extends PureComponent<
  SpoilerTextContainerProps,
  SpoilerTextContainerState
> {
  public constructor(props: SpoilerTextContainerProps) {
    super(props);
    this.state = {
      isOpened: false,
    };
  }

  render(): React.ReactNode {
    const { text } = this.props;

    return (
      <SpoilerText
        onArrowButtonClick={this.handleArrowButtonClick}
        isOpened={this.state.isOpened}
        text={text}
      />
    );
  }

  private handleArrowButtonClick = () => {
    this.setState((state: SpoilerTextContainerState) => ({
      isOpened: !state.isOpened,
    }));
  };
}

export default SpoilerTextContainer;
