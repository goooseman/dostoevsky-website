import {
  ChartDrawData,
  IChartDrawLabelData,
  IChartDrawGridData,
} from "chartist";

export const isLabel = (data: ChartDrawData): data is IChartDrawLabelData =>
  data.type === "label";

export const isXLabel = (data: IChartDrawLabelData): boolean =>
  data.axis?.units.pos === "x";

export const isGrid = (data: ChartDrawData): data is IChartDrawGridData =>
  data.type === "grid";

export const isXGrid = (data: IChartDrawGridData): boolean =>
  data.axis?.units.pos === "x";
export const isYGrid = (data: IChartDrawGridData): boolean =>
  data.axis?.units.pos === "y";

export const centerXLabel = (data: ChartDrawData): void => {
  if (!isLabel(data) || !isXLabel(data)) {
    return;
  }
  data.element.attr({
    width: 35,
  });
  if (data.index === 0) {
    return;
  }
  const x = data.x || 0;

  const digitsCount = data.element._node.textContent?.length || 1;

  if (data.index === data.axis.ticks.length - 1) {
    // last label should be right aligned
    data.element.attr({
      x: x - digitsCount * 6,
    });
    return;
  }

  data.element.attr({
    x: x - digitsCount * 3.5,
  });
};

/** Function to show vertical grid under the canvas */
export const styleVerticalGrid = (
  data: ChartDrawData,
  yLabelMargin: number,
  isFirstOneFull?: boolean
): void => {
  if (!isGrid(data) || !isXGrid(data)) {
    return;
  }
  if (data.index === 0 && isFirstOneFull) {
    data.element.attr({
      y1: data.y1,
      y2: data.y2 + yLabelMargin - 5,
    });
    return;
  }
  data.element.attr({
    y1: data.y2,
    y2: data.y2 + yLabelMargin - 5,
  });
};

/** Function to remove all horizontal lines, except for the last one */
export const removeHorizontalGridExceptLast = (data: ChartDrawData): void => {
  if (!isGrid(data) || !isYGrid(data)) {
    return;
  }
  if (data.index !== 0) {
    data.element.remove();
  }
};
