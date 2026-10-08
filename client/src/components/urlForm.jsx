import { useState } from "react";
import { createShortUrl, getErrorMessage } from "../api/urlApi.js";

export default function UrlForm({ onCreated }) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const originalUrl = value.trim();

    if (!originalUrl) {
      setError("Paste a link to shorten.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const link = await createShortUrl(originalUrl);
      onCreated(link);
      setValue("");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="original-url" className="sr-only">
        Link to shorten
      </label>
      <input
        id="original-url"
        className="form-input"
        type="text"
        inputMode="url"
        autoComplete="off"
        spellCheck={false}
        placeholder="https://example.com/a/very/long/link"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "url-error" : undefined}
      />
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Shortening..." : "Shorten link"}
      </button>
      {error && (
        <p id="url-error" className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}