import { useState } from "react";
import { fetchUrlStats, getErrorMessage } from "../api/urlApi.js";
import CopyButton from "./CopyButton.jsx";

const formatDate = (iso) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
};

function RecentLinkRow({ link, onUpdate }) {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const refreshClicks = async () => {
    setRefreshing(true);
    setError("");
    try {
      const stats = await fetchUrlStats(link.shortCode);
      onUpdate(link.shortCode, { clicks: stats.clicks });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setRefreshing(false);
    }
  };

  const clicksText =
    typeof link.clicks === "number"
      ? `${link.clicks} ${link.clicks === 1 ? "click" : "clicks"}`
      : "clicks not loaded";
  const created = formatDate(link.createdAt);

  return (
    <li className="recent-item">
      <div className="recent-text">
        <a className="recent-short" href={link.shortUrl} target="_blank" rel="noopener noreferrer">
          {link.shortUrl}
        </a>
        <p className="recent-original" title={link.originalUrl}>
          {link.originalUrl}
        </p>
        <p className="recent-meta">{created ? `Created ${created}, ${clicksText}` : clicksText}</p>
        {error && (
          <p className="error error-inline" role="alert">
            {error}
          </p>
        )}
      </div>
      <div className="recent-actions">
        <CopyButton text={link.shortUrl} />
        <button type="button" className="btn btn-quiet btn-small" onClick={refreshClicks} disabled={refreshing}>
          {refreshing ? "Refreshing..." : "Refresh clicks"}
        </button>
      </div>
    </li>
  );
}

export default function RecentLinks({ links, onUpdate, onClear }) {
  return (
    <section className="recent" aria-labelledby="recent-heading">
      <div className="recent-header">
        <h2 id="recent-heading">Recent links</h2>
        {links.length > 0 && (
          <button type="button" className="btn btn-quiet btn-small" onClick={onClear}>
            Clear list
          </button>
        )}
      </div>
      <p className="recent-note">Saved in this browser only.</p>

      {links.length === 0 ? (
        <p className="empty">Links you shorten will appear here.</p>
      ) : (
        <ul className="recent-list">
          {links.map((link) => (
            <RecentLinkRow key={link.shortCode} link={link} onUpdate={onUpdate} />
          ))}
        </ul>
      )}
    </section>
  );
}