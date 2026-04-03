import {  useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/media/ring_bg.mp4" type="video/mp4" />
      </video>

      <div className="hero-content">
        <div className="hero-subtag">Our parents said “It’s time.” so here we are.</div>
        <div className="hero-tag">You're Invited</div>

        <div className="hero-names">
          <span className="hero-name hero-name-amritha">Amritha</span>
          <span className="ampersand">&</span>
          <span className="hero-name hero-name-yuvaraj">Yuvaraj</span>
        </div>

        <div className="hero-date">May 2nd–3rd, 2026</div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  );
}