import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon"><Sparkles size={20} /></div>
        <div>
          <strong>LocalBrandAI</strong>
          <small>INDIA RUNS 4</small>
        </div>
      </div>
      <a className="github-button" href="#dashboard">View Dashboard</a>
    </header>
  );
}
