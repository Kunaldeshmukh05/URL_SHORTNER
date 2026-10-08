import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "url-shortener-recent-links";
const MAX_LINKS = 8;

const readStoredLinks = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

// Keeps the links this browser has created. Stored locally because the API has no accounts.
export default function useRecentLinks() {
  const [links, setLinks] = useState(readStoredLinks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch {
      // Storage unavailable (private mode, quota): the list still works for this session.
    }
  }, [links]);

  const addLink = useCallback((link) => {
    setLinks((prev) =>
      [link, ...prev.filter((item) => item.shortCode !== link.shortCode)].slice(0, MAX_LINKS)
    );
  }, []);

  const updateLink = useCallback((shortCode, patch) => {
    setLinks((prev) =>
      prev.map((item) => (item.shortCode === shortCode ? { ...item, ...patch } : item))
    );
  }, []);

  const clearLinks = useCallback(() => setLinks([]), []);

  return { links, addLink, updateLink, clearLinks };
}