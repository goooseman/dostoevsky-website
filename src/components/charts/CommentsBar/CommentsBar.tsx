import React, { useState, useEffect } from "react";
import ChartWrapper from "src/components/ChartWrapper";
import Chartist, {
  IChartistStepAxis,
  ChartDrawData,
  IChartDrawGridData,
} from "chartist";
import classes from "./CommentsBar.module.css";
import cn from "clsx";

interface Chart {
  title: string;
  series: {
    value: number;
    title: string;
  }[][];
}

interface CommentsBarProps {
  title: string;
  charts: Chart[];
}

const ROW_HEIGHT = 55;
const Y_LABEL_MARGIN = 15;

const isGrid = (data: ChartDrawData): data is IChartDrawGridData =>
  data.type === "grid";

const isXGrid = (data: IChartDrawGridData) => data.axis?.units.pos === "x";

const createChartRefs = (charts: Chart[]) => {
  const chartRefs = [];
  for (let i = 0; i < charts.length; i++) {
    chartRefs[i] = React.createRef<HTMLDivElement>();
  }
  return chartRefs;
};

const CommentsBar: React.FC<CommentsBarProps> = (props: CommentsBarProps) => {
  const { charts } = props;

  const [chartRefs] = useState(createChartRefs(charts));

  useEffect(() => {
    for (let i = 0; i < charts.length; i++) {
      const chart = new Chartist.Bar(
        chartRefs[i].current,
        {
          labels: [], //chartLabels,
          series: charts[i].series.map((s) =>
            s
              .map((s) => ({ value: s.value, meta: { title: s.title } }))
              .sort((a, b) => a.value - b.value)
          ), //series,
        },
        {
          stackBars: true,
          horizontalBars: true,
          axisX: {
            onlyInteger: true,
            showGrid: false,
            labelOffset: {
              y: Y_LABEL_MARGIN,
            },
          },
          axisY: {
            stretch: true,
            showGrid: true,
            offset: 0,
            fullWidth: false,
          } as IChartistStepAxis,
          chartPadding: {
            right: 20,
            bottom: 0,
          },
        }
      );

      chart.on("draw", (data: ChartDrawData) => {
        styleVerticalGrid(data);
        transformHorizontalGrid(data);
        addNumbersToBars(data);
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
    if (data.type === "grid" && data.index !== 0) {
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
      text.setAttribute("y", data.y1 + 6);
      text.setAttribute("x", textX >= data.x1 ? textX : data.x2 + 10);
      text.setAttribute(
        "class",
        `bar-number bar-number-${textX >= data.x1 ? "inside" : "outside"}`
      );
      data.element._node.parentElement.appendChild(text);
    }
  };

  const styleVerticalGrid = (data: ChartDrawData): void => {
    if (!isGrid(data) || !isXGrid(data)) {
      return;
    }
    data.element.attr({
      y1: data.y2,
      y2: data.y2 + Y_LABEL_MARGIN - 5,
    });
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
      iframePath="/"
    >
      {charts.map((c, i) => (
        <div key={i} className={classes.barOuterWrapper}>
          <div
            ref={chartRefs[i]}
            className={cn(classes.barWrapper, {
              [`ct-chart-${String.fromCharCode(97 + i)}`]: true,
            })}
            style={{
              height: charts[i].series[0].length * ROW_HEIGHT,
            }}
          />
          <div className={classes.barTitles}>
            {charts[i].series[0]
              .sort((a, b) => a.value - b.value)
              .map((s, j) => (
                <div key={j}>
                  <span>{s.title}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </ChartWrapper>
  );
};

export default CommentsBar;
