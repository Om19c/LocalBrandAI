import { Copy, MessageCircle } from 'lucide-react';

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function shareWhatsApp(text) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function Block({ title, text }) {
  return (
    <div className="output-block">
      <div className="output-title"><h3>{title}</h3><button onClick={() => copyText(text)}><Copy size={15} /> Copy</button></div>
      <p>{text}</p>
    </div>
  );
}

export default function ResultCard({ campaign }) {
  const { input, output } = campaign;
  const shareText = `${output.whatsappMessage}\n\n${output.callToAction}`;

  return (
    <article className="result-card">
      <div className="result-header">
        <div>
          <p className="eyebrow">Generated for</p>
          <h2>{input.businessName}</h2>
        </div>
        <span className="pill">{input.language}</span>
      </div>
      <Block title="Short Caption" text={output.shortCaption} />
      <Block title="WhatsApp Message" text={output.whatsappMessage} />
      <Block title="Instagram Caption" text={output.instagramCaption} />
      <Block title="Voice Ad Script" text={output.voiceScript} />
      <Block title="Call To Action" text={output.callToAction} />
      <button className="whatsapp-button" onClick={() => shareWhatsApp(shareText)}><MessageCircle size={18} /> Share on WhatsApp</button>
    </article>
  );
}
