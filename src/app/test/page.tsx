import SwipeTestDeck from "@/components/mocktest/SwipeTestDeck";

export const metadata = {
  title: "Mock Tests | SwipOlearn",
  description: "Test your knowledge with swipeable mock tests.",
};

export default function TestPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center' }}>
      <div style={{ padding: '1rem', textAlign: 'center', width: '100%' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Quick Test
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Swipe left to skip, right to answer</p>
      </div>
      <SwipeTestDeck />
    </div>
  );
}
