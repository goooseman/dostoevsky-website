/* eslint-disable react/prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

interface BubblesD3Chart {
  title: string;
  series: {
    value: number;
    title: string;
  }[][];
}

interface BubblesD3Font {
  family: string;
  size: number;
  color: string;
  weight: string;
}

interface BubblesD3Props {
  bubbleOver(e): void;
  bubbleMove(e): void;
  bubbleOut(e): void;
  bubbleClick(e): void;
  labelFont: BubblesD3Font;
  valueFont: BubblesD3Font;
  title: string;
  charts: BubblesD3Chart[];
}

export default class BubblesD3Chart extends Component {
  constructor(props: BubblesD3Props) {
    super(props);
    this.svgRef = React.createRef();
    this.renderChart = this.renderChart.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentDidMount() {
    // this.svg = ReactDOM.findDOMNode(this);
    this.svg = this.svgRef.current;
    this.renderChart();
  }

  componentDidUpdate() {
    const { width, height } = this.props;
    if (width !== 0 && height !== 0) {
      this.renderChart();
    }
  }

  render() {
    const { width, height } = this.props;
    return <svg ref={this.svgRef} width={width} height={height} />;
  }

  renderChart() {
    const { graph, data, width, padding } = this.props;

    this.svg = this.svgRef.current;
    this.svg.innerHTML = "";

    const bubblesWidth = width;
    const pack = d3
      .pack()
      .size([bubblesWidth * graph.zoom, bubblesWidth * graph.zoom])
      .padding(padding);

    // // Process the data to have a hierarchy structure;
    const root = d3
      .hierarchy({ children: data })
      .sum(function (d) {
        return d.value;
      })
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .each((d) => {
        if (d.data.label) {
          if (d.data.label.length * 10 > d.data.value) {
            d.label = d.data.label.split(" ")[0] + "...";
          } else {
            d.label = d.data.label;
          }
          d.fullLabel = d.data.label;
          d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
        }
      });

    const nodes = pack(root).leaves();
    this.renderBubbles(bubblesWidth, nodes);
  }

  renderBubbles(width, nodes) {
    const {
      graph,
      data,
      bubbleOver,
      bubbleOut,
      bubbleClick,
      valueFont,
      labelFont,
    } = this.props;

    const bubbleChart = d3
      .select(this.svg)
      .append("g")
      .attr("class", "bubble-chart")
      .attr("transform", function () {
        return (
          "translate(" +
          width * graph.offsetX +
          "," +
          width * graph.offsetY +
          ")"
        );
      });

    const node = bubbleChart
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .on("click", function (d) {
        bubbleClick(d);
      });

    node
      .append("circle")
      .attr("id", function (d) {
        return d.id;
      })
      .attr("r", function (d) {
        return d.r - d.r * 0.04;
      })
      .style("fill", function (d) {
        return d.data.color ? d.data.color : "#7C89E4";
      })
      .style("z-index", 1)
      .on("mouseover", function (d) {
        bubbleOver(d);
      })
      .on("mouseout", function (d) {
        bubbleOut(d);
      });

    node
      .append("clipPath")
      .attr("id", function (d) {
        return "clip-" + d.id;
      })
      .append("use")
      .attr("xlink:href", function (d) {
        return "#" + d.id;
      });

    // const nodeSize = 32;
    node
      .append("text")
      .attr("class", "value-text")
      .style("font-size", (d) => {
        return Math.pow(d.value, 0.5) * 5.0 + "px";
      })
      .attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      })
      .style("font-weight", () => {
        return valueFont.weight ? valueFont.weight : 600;
      })
      .style("pointer-events", "none")
      .style("font-family", valueFont.family)
      .style("fill", () => {
        return valueFont.color ? valueFont.color : "#000";
      })
      .text(function (d) {
        return d.value;
      });

    node
      .append("text")
      .attr("class", "label-text")
      .style("font-size", `${labelFont.size}px`)
      .style("pointer-events", "none")
      .attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      })
      .style("font-weight", () => {
        return labelFont.weight ? labelFont.weight : 600;
      })
      .style("font-family", labelFont.family)
      .style("fill", () => {
        return labelFont.color ? labelFont.color : "#000";
      })
      .text(function (d) {
        return d.label;
      });

    // Center the texts inside the circles.
    d3.selectAll(".label-text")
      .attr("x", function () {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        return -(width / 2);
      })
      .style("opacity", function (d) {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        d.hideLabel = width * 1.05 > d.r * 2;
        return d.hideLabel ? 0 : 1;
      })
      .attr("y", function (d) {
        if (d.hideLabel) {
          return labelFont.size / 2;
        } else {
          // var fs = Math.pow(d.value, 0.5) * 5.0;
          return labelFont.size / 2 + 10;
        }
      });

    // Center the texts inside the circles.
    d3.selectAll(".value-text")
      .attr("x", function () {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        return -(width / 2);
      })
      .attr("y", function (d) {
        if (d.hideLabel) {
          return valueFont.size / 4;
        } else {
          const fs = Math.pow(d.value, 0.5) * 6.0;
          // return -valueFont.size / 2  - fs / 4;
          return -fs / 8;
        }
      });

    node.append("title").text(function (d) {
      return d.label;
    });
  }
}

BubblesD3Chart.propTypes = {
  graph: PropTypes.shape({
    zoom: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  valueFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
  labelFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
};

BubblesD3Chart.defaultProps = {
  graph: {
    zoom: 1.0,
    offsetX: 0.0,
    offsetY: 0.0,
  },
  width: 600,
  height: 600,
  padding: 0,
  valueFont: {
    family: "var(--font-family-serif)",
    size: 32,
    color: "#fff",
    weight: "bold",
  },
  labelFont: {
    family: "Arial",
    size: 11,
    color: "#fff",
    weight: "normal",
  },
};
