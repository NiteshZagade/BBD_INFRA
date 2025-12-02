"use client";

import Script from "next/script";

export default function DatawrapperEmbed({
  chartId,
  minHeight = 528,
  title = "Choropleth map",
  idSuffix,
}: {
  chartId: string;
  minHeight?: number;
  title?: string;
  idSuffix?: string;
}) {
  const domId = `datawrapper-vis-${chartId}${idSuffix ? `-${idSuffix}` : ""}`;
  const png = `https://datawrapper.dwcdn.net/${chartId}/full.png`;
  const src = `https://datawrapper.dwcdn.net/${chartId}/embed.js`;
  return (
    <div style={{ minHeight }} id={domId}>
      <Script
        src={src}
        charSet="utf-8"
        strategy="afterInteractive"
        defer
        data-target={`#${domId}` as any}
      />
      <noscript>
        {/* Fallback image when JS is disabled */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={png} alt={title} />
      </noscript>
    </div>
  );
}

