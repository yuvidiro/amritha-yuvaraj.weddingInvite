export default function Venue() {
  return (
    <section className="venue-section reveal">
      
      {/* Background Layer */}
      <div
        className="venue-bg"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/venue_bg.png)`
        }}
      />

      {/* Top text — floats to the top-right */}
      <div className="venue-top">
        <div className="presence-text">
          Attendance is compulsory… ghosting not allowed 👻
        </div>
      </div>

      {/* Bottom block — anchored to the bottom */}
      <div className="venue-bottom">
        <h2 className="venue-title">The Puttur Club</h2>
        <p className="venue-address">
          185 B/A, Club Road <br />
          Kabakaputtur, Karnataka
        </p>
        <a
          href="https://maps.google.com/?q=The+Puttur+Club"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Open Maps
        </a>
      </div>
    </section>
  );
}