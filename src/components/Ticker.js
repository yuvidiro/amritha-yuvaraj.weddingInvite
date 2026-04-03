export default function Ticker() {
  const items = (
    <>
  LOUD LAUGHS <span>•</span> CRAZY DANCE FLOOR <span>•</span> BACHELOR LIFE OVER{" "}
  <span>•</span> THALI LOADING <span>•</span> SILK SAREE ENERGY{" "}
  <span>•</span> NADASWARAM BANGERS <span>•</span> NEER DOSA GANG{" "} <span>•</span> PHOTOBOOTH CHAOS{" "}
  <span>•</span>&nbsp;&nbsp;
</>
  );

  return (
    <div className="ticker-wrapper">
      <div className="ticker-track">
        <div className="ticker-text">{items}</div>
        <div className="ticker-text">{items}</div>
      </div>
    </div>
  );
}