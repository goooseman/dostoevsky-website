const getMaximum = (array: number[]) => Math.max(...array);

const getMinimum = (array: number[]) => Math.min(...array);

const sumReducer = (acc: number, cur: number) => acc + cur;

const roundValue = (number: number) =>
  Math.max(Math.round(number * 100) / 100, 0);

const worstRatio = (row: number[], width: number) => {
  const sum = row.reduce(sumReducer, 0);
  const rowMax = getMaximum(row);
  const rowMin = getMinimum(row);
  return Math.max(
    (width ** 2 * rowMax) / sum ** 2,
    sum ** 2 / (width ** 2 * rowMin)
  );
};

const getFontSize = (percent: number) => {
  const size = percent * 120;
  return size > 16 ? size : 16;
};

type ValueData = { value: number };

interface TreemapDataProps {
  data: ValueData[];
  width: number;
  height: number;
}

class TreemapData {
  Rectangle: {
    data: {
      x: number;
      y: number;
      width: number;
      height: number;
      data: ValueData;
    }[];
    xBeginning: number;
    yBeginning: number;
    totalWidth: number;
    totalHeight: number;
  };
  initialData: ValueData[];

  constructor(props: TreemapDataProps) {
    const { data, width, height } = props;
    this.Rectangle = {
      data: [],
      xBeginning: 0,
      yBeginning: 0,
      totalWidth: width,
      totalHeight: height,
    };
    this.initialData = data;
    const totalValue = data
      .map((dataPoint) => dataPoint.value)
      .reduce(sumReducer, 0);

    const dataScaled = data.map(
      (dataPoint) => (dataPoint.value * height * width) / totalValue
    );

    this.squarify(dataScaled, [], this.getMinWidth().value);

    /* @ts-ignore */
    return this.Rectangle.data.map((dataPoint) => {
      const percent = roundValue(dataPoint.data.value / totalValue);
      return {
        ...dataPoint,
        data: {
          ...dataPoint.data,
          percent,
          fontSize: getFontSize(percent),
        },
        x: roundValue(dataPoint.x),
        y: roundValue(dataPoint.y),
        width: roundValue(dataPoint.width),
        height: roundValue(dataPoint.height),
      };
    });
  }

  getMinWidth = (): { value: number; vertical: boolean } => {
    if (this.Rectangle.totalHeight ** 2 > this.Rectangle.totalWidth ** 2) {
      return { value: this.Rectangle.totalWidth, vertical: false };
    }
    return { value: this.Rectangle.totalHeight, vertical: true };
  };

  layoutRow = (row: number[], width: number, vertical: boolean): void => {
    const rowHeight = row.reduce(sumReducer, 0) / width;

    row.forEach((rowItem) => {
      const rowWidth = rowItem / rowHeight;
      const { xBeginning } = this.Rectangle;
      const { yBeginning } = this.Rectangle;

      let data;
      if (vertical) {
        data = {
          x: xBeginning,
          y: yBeginning,
          width: rowHeight,
          height: rowWidth,
          data: this.initialData[this.Rectangle.data.length],
        };
        this.Rectangle.yBeginning += rowWidth;
      } else {
        data = {
          x: xBeginning,
          y: yBeginning,
          width: rowWidth,
          height: rowHeight,
          data: this.initialData[this.Rectangle.data.length],
        };
        this.Rectangle.xBeginning += rowWidth;
      }

      this.Rectangle.data.push(data);
    });

    if (vertical) {
      this.Rectangle.xBeginning += rowHeight;
      this.Rectangle.yBeginning -= width;
      this.Rectangle.totalWidth -= rowHeight;
    } else {
      this.Rectangle.xBeginning -= width;
      this.Rectangle.yBeginning += rowHeight;
      this.Rectangle.totalHeight -= rowHeight;
    }
  };

  layoutLastRow = (rows: number[], children: number[], width: number): void => {
    const { vertical } = this.getMinWidth();
    this.layoutRow(rows, width, vertical);
    this.layoutRow(children, width, vertical);
  };

  squarify = (children: number[], row: number[], width: number): void => {
    if (Number(children.length) === 1) {
      return this.layoutLastRow(row, children, width);
    }
    const rowWithChild = [...row, children[0]];

    if (
      row.length === 0 ||
      worstRatio(row, width) >= worstRatio(rowWithChild, width)
    ) {
      children.shift();
      return this.squarify(children, rowWithChild, width);
    }
    this.layoutRow(row, width, this.getMinWidth().vertical);
    return this.squarify(children, [], this.getMinWidth().value);
  };
}

export default TreemapData;
