import React from "react";
import classes from "./Treemap.module.css";
import cn from "clsx";
import TreemapData from "src/utils/treemap";
import Typography from "src/components/ui-kit/Typography";

const TREEMAP_COLORS = ["#7C89E4", "#FF6700", "#BA9BAF", "#F3607B"];

interface TreemapProps {
  data: { value: number; label?: string }[];
  width: number;
  height: number;
}

const Treemap: React.FC<TreemapProps> = ({
  data,
  width,
  height,
}: TreemapProps) => {
  const chartData = new TreemapData({
    data: data
      .sort((a, b) => b.value - a.value)
      .map((t, i) => ({
        ...t,
        color: TREEMAP_COLORS[i],
      })),
    width,
    height,
  });

  return (
    <svg width={width} height={height}>
      {/* @ts-ignore */}
      {chartData.map((rectangle) => (
        <g key={`${rectangle.x}:${rectangle.y}`} fill={rectangle.data.color}>
          <rect
            x={rectangle.x}
            y={rectangle.y}
            width={rectangle.width}
            height={rectangle.height}
            stroke="#fff"
            strokeWidth="2"
          />
          <foreignObject
            x={rectangle.x}
            y={rectangle.y}
            width={rectangle.width}
            height={rectangle.height}
          >
            <div className={cn(classes.treemapReactangleContentWrapper)}>
              <div>
                <Typography
                  className={cn(classes.treemapReactangleNumber)}
                  style={{ fontSize: `${rectangle.data.fontSize}px` }}
                  font="serif"
                >
                  {rectangle.data.value}
                </Typography>
                {rectangle.height > 80 ? (
                  <Typography className={cn(classes.treemapReactangleLabel)}>
                    {rectangle.data.label}
                  </Typography>
                ) : null}
              </div>
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
};

export default Treemap;
