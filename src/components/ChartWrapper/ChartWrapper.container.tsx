import React, { PureComponent } from "react";
import ChartWrapper from "./ChartWrapper";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

interface ChartWrapperContainerProps
  extends Omit<
    React.ComponentProps<typeof ChartWrapper>,
    "onDownloadButtonClick" | "downloadAreaRef"
  > {
  isImageGenerationDebug?: boolean;
}

class ChartWrapperContainer extends PureComponent<ChartWrapperContainerProps> {
  public static defaultProps = {
    isImageGenerationDebug: false,
  };

  private downloadAreaRef = React.createRef<HTMLDivElement>();

  render(): React.ReactNode {
    return (
      <ChartWrapper
        {...this.props}
        onDownloadButtonClick={this.handleDownloadButtonClick}
        downloadAreaRef={this.downloadAreaRef}
      ></ChartWrapper>
    );
  }

  private handleDownloadButtonClick = async () => {
    if (!this.downloadAreaRef.current) {
      return;
    }

    if (this.props.isImageGenerationDebug) {
      const dataUrl = await domtoimage.toSvg(this.downloadAreaRef.current);
      const img = new Image();
      img.src = dataUrl;
      const w = window.open("");
      w?.document.write(img.outerHTML);
      return;
    }

    const dataUrl = await domtoimage.toPng(this.downloadAreaRef.current);
    saveAs(dataUrl, this.props.downloadFilename);
  };
}

export default ChartWrapperContainer;
