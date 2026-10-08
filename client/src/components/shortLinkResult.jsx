import CopyButton from "./CopyButton.jsx";

export default function ShortLinkResult({ link }) {
  return (
    <section className="result" aria-label="Your short link">
      <div className="short-strip">
        <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
          {link.shortUrl}
        </a>
        <CopyButton text={link.shortUrl} className="btn btn-primary btn-small" />
      </div>
      <p className="result-original" title={link.originalUrl}>
        Redirects to {link.originalUrl}
      </p>
    </section>
  );
}