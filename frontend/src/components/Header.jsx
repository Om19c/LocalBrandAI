
import { LogOut, Moon, Sparkles, Sun } from 'lucide-react';

export default function Header({ user, darkMode, onToggleTheme, onLogout }) {
  return (
    <header className="header glass-card nav-glass">
      <div className="brand"><div className="brand-icon"><Sparkles size={20} /></div><div><strong>LocalBrandAI</strong><small>{user?.name || 'INDIA RUNS 4'}</small></div></div>
      <div className="nav-actions">
        <button className="icon-button" onClick={onToggleTheme}>{darkMode ? <Sun size={18}/> : <Moon size={18}/>} {darkMode ? 'Light' : 'Dark'}</button>
        <a className="github-button" href="#dashboard">Dashboard</a>
        <button className="icon-button danger-soft" onClick={onLogout}><LogOut size={18}/> Logout</button>
      </div>
    </header>
  );
}
