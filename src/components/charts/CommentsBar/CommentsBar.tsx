import React, { useState, useEffect } from "react";
import ChartWrapper, { LabelOverrideValue } from "src/components/ChartWrapper";
import Chartist, { IChartistStepAxis, ChartDrawData } from "chartist";
import classes from "./CommentsBar.module.css";
import cn from "clsx";
import { removeTextInBrackets, capitalize } from "src/utils/strings";
import { centerXLabel, styleVerticalGrid, isYGrid } from "src/utils/chartist";

interface Chart {
  title: string;
  series: {
    value: number;
    title: string;
  }[][];
}

interface CommentsBarProps {
  title: string;
  iframePath: string;
  charts: Chart[];
  labelOverrides?: LabelOverrideValue[];
}

const ROW_HEIGHT = 55;
const Y_LABEL_MARGIN = 15;

const createChartRefs = (charts: Chart[]) => {
  const chartRefs = [];
  for (let i = 0; i < charts.length; i++) {
    chartRefs[i] = React.createRef<HTMLDivElement>();
  }
  return chartRefs;
};

const CommentsBar: React.FC<CommentsBarProps> = (props: CommentsBarProps) => {
  const { charts, labelOverrides } = props;

  const [chartRefs] = useState(createChartRefs(charts));

  useEffect(() => {
    for (let i = 0; i < charts.length; i++) {
      const labels: string[] = [];
      const chart = new Chartist.Bar(
        chartRefs[i].current,
        {
          series: charts[i].series.map((s) =>
            s
              .sort((a, b) => a.value - b.value)
              .map((s) => {
                labels.push(capitalize(removeTextInBrackets(s.title)));
                return {
                  value: s.value,
                  meta: { title: s.title },
                };
              })
          ),
          labels: labels,
        },
        {
          stackBars: true,
          horizontalBars: true,
          axisX: {
            onlyInteger: true,
            showGrid: true,
            scaleMinSpace: 50,
            labelOffset: {
              y: Y_LABEL_MARGIN,
            },
          },
          axisY: {
            stretch: true,
            showGrid: true,
            offset: 0,
            fullWidth: false,
            position: "end",
          } as IChartistStepAxis,
          chartPadding: {
            right: 305,
            bottom: 0,
          },
        },
        [
          [
            "screen and (max-width: 680px)",
            {
              chartPadding: {
                right: 180,
                left: 0,
              },
            },
          ],
        ]
      );

      chart.on("draw", (data: ChartDrawData) => {
        styleVerticalGrid(data, Y_LABEL_MARGIN);
        transformHorizontalGrid(data);
        addNumbersToBars(data);
        centerXLabel(data);
      });
    }
  }, []);

  const transformHorizontalGrid = (data: ChartDrawData): void => {
    if (data.type === "bar") {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", data.x1);
      line.setAttribute("x2", data.chartRect.x2);
      line.setAttribute("y1", data.y1);
      line.setAttribute("y2", data.y2);
      line.setAttribute("class", "ct-grid ct-vertical");
      data.element._node.parentElement.insertBefore(line, data.element._node);
    }
    if (data.type === "grid" && data.index !== 0 && isYGrid(data)) {
      data.element.remove();
    }
  };

  const addNumbersToBars = (data: ChartDrawData): void => {
    if (data.type === "bar") {
      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.innerHTML = data.value.x;
      const textX = data.x2 - text.innerHTML.length * 11.5;
      const isInside = textX >= data.x1;
      text.setAttribute("y", data.y1 + 6);
      text.setAttribute("x", isInside ? textX : data.x2 + 10);
      text.setAttribute(
        "class",
        `bar-number bar-number-${isInside ? "inside" : "outside"}`
      );

      let background;
      if (!isInside) {
        background = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        background.setAttribute("x1", data.x2);
        background.setAttribute("y1", data.y1);
        background.setAttribute("y2", data.y2);
        background.setAttribute("class", "bar-number-background");
        data.element._node.parentElement.appendChild(background);
      }
      // Background should be added before text
      data.element._node.parentElement.appendChild(text);

      if (background) {
        background.setAttribute("x2", data.x2 + text.getBBox().width + 20);
      }
    }
  };

  const getLabels = () => {
    if (charts.length === 1) {
      return charts.map((s) => s.title);
    }
    return undefined;
  };

  return (
    <ChartWrapper
      {...props}
      labels={getLabels()}
      downloadFilename={props.title}
      iframePath={props.iframePath}
      labelOverrides={labelOverrides}
    >
      {charts.map((c, i) => (
        <div key={i} className={classes.barOuterWrapper}>
          <div
            ref={chartRefs[i]}
            className={cn(classes.barWrapper, {
              [`ct-chart-${
                labelOverrides ? labelOverrides[i] : String.fromCharCode(97 + i)
              }`]: true,
            })}
            style={{
              height: charts[i].series[0].length * ROW_HEIGHT,
            }}
          />
        </div>
      ))}
    </ChartWrapper>
  );
};

export default React.memo(CommentsBar);
