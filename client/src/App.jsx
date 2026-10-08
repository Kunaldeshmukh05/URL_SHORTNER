import { useState } from "react";
import UrlForm from "./components/urlForm.jsx";
import ShortLinkResult from "./components/ShortLinkResult.jsx";
import RecentLinks from "./components/recentLinks.jsx";
import useRecentLinks from "./hooks/useRecentLinks.js";

export default function App() {
  const { links, addLink, updateLink, clearLinks } = useRecentLinks();
  const [latest, setLatest] = useState(null);

  const handleCreated = (link) => {
    setLatest(link);
    addLink({ ...link, clicks: 0 });
  };

  // The newest link has its own strip above, so the list shows only earlier ones.
  const earlier = latest ? links.filter((link) => link.shortCode !== latest.shortCode) : links;
  const showRecent = earlier.length > 0 || !latest;

  return (
    <main className="app">
      <h3>Author: Kunal Deshmukh</h3>
      <h1>Paste a long link. Get a short one.</h1>
      <UrlForm onCreated={handleCreated} />
      {latest && <ShortLinkResult key={latest.shortCode} link={latest} />}
      {showRecent && <RecentLinks links={earlier} onUpdate={updateLink} onClear={clearLinks} />}
    </main>
  );
}