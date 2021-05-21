// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import CommentsBar from "src/components/charts/CommentsBar";
import BubblesChartWrapper from "../BubblesChartWrapper";

const ArticleChartAdapter: React.FC = (props: {
  title;
  name;
  color;
  legend;
  type;
}) => {
  const charts = [];
  const lines = props.children.split("|");
  for (const line in lines) {
    const v = lines[line].split(" ,");
    charts.push({
      value: v[1],
      title: v[0].replace(/['"]+/g, "").trim(),
      label: v[0].replace(/['"]+/g, "").trim(),
    });
  }
  const data = {
    title: props.title,
    charts: [{ title: props.legend, series: [charts] }],
  };

  if (props.type === "lines") {
    return (
      <CommentsBar
        {...data}
        color={props.color}
        labelOverrides={props.color}
        tooltipDescription={{ "Число человек": "%%" }}
      />
    );
  } else {
    return (
      <BubblesChartWrapper
        {...data}
        color={props.color}
        labelOverrides={props.color}
      />
    );
  }
};

export default React.memo(ArticleChartAdapter);
