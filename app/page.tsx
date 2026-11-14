// The home page is the static file public/index.html, served at "/" by the rewrite in
// next.config.ts. This component only renders if that rewrite is removed.
export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "monospace" }}>
      <a href="/index.html">Open the site</a>
    </main>
  );
}
