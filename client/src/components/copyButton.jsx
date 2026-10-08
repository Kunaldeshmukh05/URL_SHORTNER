import { useEffect, useRef, useState } from "react";

export default function CopyButton({ text, label = "Copy link", className = "btn btn-quiet btn-small" }) {
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  const visibleLabel = status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : label;
  const announcement =
    status === "copied" ? "Link copied to clipboard" : status === "failed" ? "Could not copy the link" : "";

  return (
    <>
      <button type="button" className={className} onClick={handleClick}>
        {visibleLabel}
      </button>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </>
  );
}