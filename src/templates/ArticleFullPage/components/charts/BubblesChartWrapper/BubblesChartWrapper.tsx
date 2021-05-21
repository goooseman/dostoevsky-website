// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import ChartWrapper, { LabelOverrideValue } from "src/components/ChartWrapper";
import classes from "./BubblesChartWrapper.module.css";
import cn from "clsx";
import BubblesD3Chart from "./BubblesD3Chart";
import Typography from "src/components/ui-kit/Typography";

interface Chart {
  title: string;
  series: {
    value: number;
    title: string;
  }[][];
}

interface BubblesProps {
  title: string;
  iframePath: string;
  charts: Chart[];
  labelOverrides?: LabelOverrideValue[];
}

const BubblesChartWrapper: React.FC<BubblesProps> = (props: BubblesProps) => {
  const { charts, labelOverrides } = props;
  const [hover, setHover] = useState(false);
  const [text, setText] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<SVGCircleElement>) => {
    if (event.target.__data__) {
      setX(event.pageX - 100);
      setY(event.pageY + 40);
      setHover(true);
    } else {
      setHover(false);
    }
  };

  const handleOver = (d) => {
    setText(d.target.__data__.fullLabel);
    setHover(true);
  };

  const handleOut = () => {
    setHover(false);
    setText("");
  };

  const getLabels = () => {
    if (charts.length === 1) {
      return charts.map((s) => s.title);
    }
    return undefined;
  };

  const tooltipStyle = {
    position: "absolute",
    display: hover ? "block" : "none",
    left: x,
    top: y,
    border: 1,
  } as const;

  return (
    <ChartWrapper
      {...props}
      labels={getLabels()}
      downloadFilename={props.title}
      iframePath={props.iframePath}
      labelOverrides={labelOverrides}
    >
      {charts.map((c, i) => (
        <div
          key={i}
          className={cn(classes.svgContainer)}
          onMouseMove={handleMouseMove}
          onMouseOut={handleOut}
        >
          <div style={tooltipStyle} className={cn(classes.bubblesTip)}>
            <Typography>{text}</Typography>
          </div>
          <BubblesD3Chart
            data={charts[i].series[0]}
            type={"Bubbles"}
            bubbleOver={handleOver.bind(this)}
            bubbleOut={handleOut.bind(this)}
          />
        </div>
      ))}
    </ChartWrapper>
  );
};

export default React.memo(BubblesChartWrapper);
