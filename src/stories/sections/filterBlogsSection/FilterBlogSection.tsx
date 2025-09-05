import { useState } from 'react';

// Placeholder SVGs and background imports
// import StarSVG from '@/public/icons/solid-star.svg';
// import CrownSVG from '@/public/icons/solid-crown.svg';
// import BackgroundSVG from '@/public/backgrounds/game-background.png';
// import StarSVG from './StarSVG';
// import CrownSVG from './CrownSVG';
// import BackgroundSVG from './BackgroundSVG';

interface Metric {
  name: string;
  value: number;
  hidden: boolean;
  crowned: boolean;
}

interface MetricCardProps {
  title: string;
  metrics: Metric[];
}

function MetricCard({ title, metrics }: MetricCardProps) {
  // Each metric: { name: string, value: number, hidden: boolean, crowned: boolean }
  const [metricState, setMetricState] = useState(metrics);

  // Calculate Average, excluding hidden, doubling crowned
  const calculateAverage = () => {
    let total = 0, count = 0;
    metricState.forEach(m => {
      if (!m.hidden) {
        total += m.crowned ? m.value * 2 : m.value;
        count += m.crowned ? 2 : 1;
      }
    });
    return count === 0 ? 0 : Math.round((total / count) * 10) / 10;
  };

  // Handlers
  const toggleHidden = idx => {
    setMetricState(prev =>
      prev.map((m, i) => i === idx ? { ...m, hidden: !m.hidden, crowned: m.hidden ? false : m.crowned } : m)
    );
  };
  const toggleCrown = idx => {
    setMetricState(prev =>
      prev.map((m, i) => i === idx ? { ...m, crowned: !m.crowned } : m)
    );
  };

  return (
    <div style={{
      width: 350,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(20,20,40,0.5)",
      background: "#232034",
      position: "relative",
      color: "white",
      padding: 24,
      fontFamily: "sans-serif"
    }}>
      {/* Placeholder for background SVG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* <BackgroundSVG /> */}
        <div style={{
          width: "100%",
          height: "100%",
          background: "#424242", // Use your SVG here
          opacity: 0.6
        }} />
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 style={{ textAlign: "center", fontWeight: 700, marginBottom: 16 }}>
          {title}
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 22
        }}>
          {/* Circle with average number */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#232734",
            border: "4px solid #FFD700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: "bold",
          }}>
            {calculateAverage()}
          </div>
        </div>
        <div>
          {metricState.map((metric, idx) => !metric.hidden ? (
            <div key={idx} style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 12,
              gap: 10,
              background: "#2D2D43",
              borderRadius: 8,
              padding: "7px 14px",
              boxShadow: metric.crowned ? "0 0 4px 3px #FFD700" : undefined
            }}>
              <span style={{ minWidth: 70 }}>
                {metric.name}:
              </span>
              {/* Render stars */}
              <div style={{ display: "flex" }}>
                {[...Array(metric.value)].map((_, i) => (
                  // <StarSVG key={i} />
                  <span key={i} style={{ width: 20, height: 20, display: "inline-block", background: "#FFD700", borderRadius: "50%" }} />
                ))}
              </div>
              <button onClick={() => toggleHidden(idx)} style={{ marginLeft: "auto", background: "#444", border: "none", borderRadius: 4, padding: 6, color: "white", cursor: "pointer" }}>Hide</button>
              <button onClick={() => toggleCrown(idx)} style={{
                marginLeft: 6,
                background: metric.crowned ? "#FFD700" : "#444", 
                border: "none",
                borderRadius: 4,
                padding: 6,
                color: metric.crowned ? "#232034" : "white",
                cursor: "pointer"
              }}>
                {/* <CrownSVG /> */}
                👑
              </button>
            </div>
          ) : (
            <div key={idx} style={{
              opacity: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}>
              <span style={{ minWidth: 70 }}>{metric.name}: <span style={{ fontStyle: "italic" }}>(Hidden)</span></span>
              <button onClick={() => toggleHidden(idx)} style={{ marginLeft: "auto", background: "#444", border: "none", borderRadius: 4, padding: 6, color: "white", cursor: "pointer" }}>Unhide</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;

// EXAMPLE USAGE:
const exampleMetrics = [
  { name: "Story", value: 5, hidden: false, crowned: false },
  { name: "Voice", value: 3, hidden: false, crowned: false },
  { name: "Music", value: 4, hidden: false, crowned: true }
];

// <MetricCard title="JoJo’s Bizarre Adventure: All Star Battle R" metrics={exampleMetrics} />
