import { useState } from "react";

export default function DoorIntro() {
  const [animating, setAnimating] = useState(false);
  const [done, setDone] = useState(false);

  const handleEnter = () => {
    setAnimating(true);
    setTimeout(() => setDone(true), 2500);
  };

  if (done) return null;

  return (
    <div className={`door-overlay ${animating ? "animating" : ""}`}>
      <div className={`door door-left ${animating ? "open" : ""}`}>
        <div className="door-inner-border"></div>
        <div className="seal-half seal-left">A</div>
      </div>

      <div className={`door door-right ${animating ? "open" : ""}`}>
        <div className="door-inner-border"></div>
        <div className="seal-half seal-right">Y</div>
      </div>

      {!animating && (
        <button className="enter-btn" onClick={handleEnter}>
          E N T E R
        </button>
      )}
    </div>
  );
}