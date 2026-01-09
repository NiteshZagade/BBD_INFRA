"use client";

export default function CanvaEmbed({
  src = "https://www.canva.com/design/DAG8ZBYvMN0/KH3fjOnytjaPESllSUuPAA/view?embed",
  title = "Maharashtra Project Footprint",
}: {
  src?: string;
  title?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: "66.6667%",
        paddingBottom: 0,
        boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
        marginTop: "1.6em",
        marginBottom: "0.9em",
        overflow: "hidden",
        borderRadius: 8,
        willChange: "transform",
      }}
      aria-label={title}
    >
      <iframe
        loading="lazy"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          border: "none",
          padding: 0,
          margin: 0,
        }}
        src={src}
        allowFullScreen
        title={title}
      />
    </div>
  );
}

