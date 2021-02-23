import React, { useRef } from "react";
import classes from "./Treemap.module.css";
import cn from "clsx";
import TreemapData from "src/utils/treemap";
import Typography from "src/components/ui-kit/Typography";
import EmbedModal from "src/components/EmbedModal";
import DownloadButton from "src/components/DownloadButton";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { T, useLocale } from "react-targem";
import Tooltip from "src/components/ui-kit/Tooltip";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const TREEMAP_COLORS = ["#7C89E4", "#FF6700", "#BA9BAF", "#F3607B"];

interface TreemapProps {
  clauseNumber: number;
  year: number;
  title: string;
  data: { value: number; label?: string }[];
  height: number;
  isIframeMode?: boolean;
  downloadFilename: string;
  iframePath: string;
}

const Treemap: React.FC<TreemapProps> = ({
  title,
  data,
  height,
  isIframeMode,
  downloadFilename,
  iframePath,
  clauseNumber,
}: TreemapProps) => {
  const downloadAreaRef = useRef(null);
  const { t } = useLocale();

  const handleDownloadButtonClick = async () => {
    if (!downloadAreaRef || !downloadAreaRef.current) {
      return;
    }
    /* @ts-ignore */
    const dataUrl = await domtoimage.toPng(downloadAreaRef.current);
    saveAs(dataUrl, downloadFilename);
  };

  const chartData = data
    .filter((t) => t.value !== 0)
    .sort((a, b) => b.value - a.value)
    .map((t, i) => ({
      ...t,
      color: TREEMAP_COLORS[i],
    }));

  let width = 625;
  if (typeof window !== "undefined" && window.innerWidth < 645) {
    width = window.innerWidth - 20;
  }

  if (chartData.length === 0) {
    return (
      <div>
        {title ? (
          <Typography variant="h3" isUpperCased className={classes.title}>
            <b>{title}</b>
          </Typography>
        ) : null}
        <Typography>
          <T message="Недостаточно данных для генерации графика." />
        </Typography>
      </div>
    );
  }

  const treemaap = new TreemapData({
    data: chartData,
    width,
    height,
  });

  return (
    <div style={{ width }}>
      <div ref={downloadAreaRef}>
        {title ? (
          <Typography variant="h3" isUpperCased className={classes.title}>
            <b>{title}</b>
          </Typography>
        ) : null}
        <svg width={width} height={height}>
          {/* @ts-ignore */}
          {treemaap.map((rectangle) => (
            <g
              key={`${rectangle.x}:${rectangle.y}`}
              fill={rectangle.data.color}
            >
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
                <Tooltip
                  tip={`<p><b>${t("Состав")}:</b> ${clauseNumber} ${t(
                    "основной состав"
                  )}</p>
                  <p><b>${t("Меры")}:</b> ${rectangle.data.label}</p>
                  <p><b>${t("Число человек")}:</b> ${rectangle.data.value}</p>`}
                  className={cn(classes.treemapReactangleContentWrapper)}
                >
                  <div>
                    {rectangle.height > 20 && rectangle.width > 20 ? (
                      <Typography
                        className={cn(classes.treemapReactangleNumber)}
                        style={{ fontSize: `${rectangle.data.fontSize}px` }}
                        font="serif"
                      >
                        {rectangle.data.value}
                      </Typography>
                    ) : null}
                    {rectangle.height > 80 && rectangle.width > 120 ? (
                      <Typography
                        className={cn(classes.treemapReactangleLabel)}
                      >
                        {rectangle.data.label}
                      </Typography>
                    ) : null}
                  </div>
                </Tooltip>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>
      <div className={classes.bottomWrapper}>
        <div className={cn(classes.footer)}>
          <hr className={cn(classes.border)} />
          <Typography color="muted">
            <small>
              <OutboundLink
                target="_blank"
                rel="noreferrer"
                href="http://cdep.ru/index.php?id=79"
              >
                Источник: Судебный департамент
              </OutboundLink>
            </small>
          </Typography>
        </div>
        {!isIframeMode ? (
          <div className={cn(classes.actions)}>
            <EmbedModal title={title} type="chart" iframePath={iframePath} />
            <DownloadButton
              title={title}
              type="chart"
              onClick={handleDownloadButtonClick}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default React.memo(Treemap);
