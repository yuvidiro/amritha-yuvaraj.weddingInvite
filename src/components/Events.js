import { useRef } from 'react';

export default function Events() {
  const videoRef = useRef(null);

  return (
    <section className="events-section reveal" style={{ position: 'relative' }}>
      
      {/* 🎬 Background Video */}
      <video
        ref={videoRef}
        className="events-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/media/flowers_bg.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay (for readability) */}
      <div className="events-dark-overlay" />

      {/* 🧾 Content */}
      <div className="container events-overlay">
        <h2 className="title">The Schedule</h2>

        <div className="events-grid">
          <div className="event-card reveal delay-1 active">
            <div className="event-num">01</div>
            <div className="event-tag">Night One</div>
            <div className="event-title">Sangeeth Night</div>
            <div className="event-time">
              Saturday, May 2nd
              <span>6:00 PM – 10:00 PM</span>
            </div>
            <div className="event-desc">
              Get ready to dance like your relatives aren’t secretly judging you 💃. 
              Bring your madness. Bring your moves. And most importantly —
              <span className="gift-tooltip-container">
                {' '}bring big big gifts
                <span className="gift-tooltip-content">
                  <span className="bouncing-gift">🎁</span>
                  <span
                    style={{
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                    }}
                  >
                    UPI Also Accepted! 😉💸
                  </span>
                </span>
              </span>. We are modern.
            </div>
          </div>

          <div className="event-card">
            <div className="event-num">02</div>
            <div className="event-tag">Main Event</div>
            <div className="event-title">Wedding</div>

            <div className="event-time">
              Sunday, May 3rd
              <span>10:00 AM – 11:00 AM</span>
            </div>

            <div className="event-desc">
              Come bless us before we officially become "responsible adults." 
              No long speeches. No formal drama. Just love. ❤️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}