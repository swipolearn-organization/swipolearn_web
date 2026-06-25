import ReelFeed from "@/components/learning/ReelFeed";

export const metadata = {
  title: "Learn | SwipOlearn",
  description: "Learn fast with engaging, bite-sized reels.",
};

export default function LearnPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <div style={{ padding: '1rem', textAlign: 'center', width: '100%' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Daily Knowledge
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Swipe up to learn more</p>
      </div>
      <ReelFeed />
    </div>
  );
}
