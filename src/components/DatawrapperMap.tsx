"use client";

import { useEffect } from "react";

export default function DatawrapperMap({
  chartId,
  title = "Maharashtra District Map",
  height = 528,
  width,
  version,
}: {
  chartId: string;
  title?: string;
  height?: number;
  width?: number;
  version?: number | null;
}) {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const payload: any = event.data;
      if (payload && payload["datawrapper-height"]) {
        const iframes = document.querySelectorAll<HTMLIFrameElement>("iframe[data-dw-embed]");
        for (const key in payload["datawrapper-height"]) {
          for (let i = 0; i < iframes.length; i++) {
            const el = iframes[i];
            if (el.contentWindow === event.source) {
              el.style.height = payload["datawrapper-height"][key] + "px";
            }
          }
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const src = `https://datawrapper.dwcdn.net/${chartId}/${typeof version === "number" ? `${version}/` : ""}`;
  const style = width
    ? { border: "none" as const }
    : { width: "100%", minWidth: "100%", border: "none" as const };

  return (
    <iframe
      key={`${chartId}-${version ?? "latest"}`}
      data-dw-embed
      id={`datawrapper-chart-${chartId}`}
      title={title}
      aria-label="Choropleth map"
      src={src}
      scrolling="no"
      frameBorder={0}
      style={style}
      width={width}
      height={height}
    />
  );
}
