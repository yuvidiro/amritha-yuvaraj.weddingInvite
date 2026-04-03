import { useState } from 'react';

export default function Footer() {
  const [showRegister, setShowRegister] = useState(false);
  const whatsappNumber = '917077109905'; // Change this to your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Broooo I’m definitely coming! Save me food and a dance spot!!!'
  )}`;

  const openWhatsapp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer">
      <div className="footer-quote">Let’s get this party started</div>

      <div className="footer-emojis">❤️ 🎉 💃</div>

      <div className="footer-share">
        <button className="register-btn" onClick={() => setShowRegister(true)}>
          Attendance Folks
        </button>
      </div>

      {showRegister && (
        <div className="register-popup">
          <div className="popup-content">
            <p className="popup-text">
             Forms are boring 😴 Just slide into our WhatsApp like a VIP 😎{' '}
            </p>
            <button className="popup-action" onClick={openWhatsapp}>
              Ping on WhatsApp 🚀
            </button>
            <button className="popup-close" onClick={() => setShowRegister(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}