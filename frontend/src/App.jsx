import { useEffect, useState } from 'react';
import { BrainCircuit, Download, Languages, Megaphone, Palette, ShieldCheck, Smartphone, WandSparkles } from 'lucide-react';
import Header from './components/Header.jsx';
import CampaignForm from './components/CampaignForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import HistoryCard from './components/HistoryCard.jsx';
import Loader from './components/Loader.jsx';
import Analytics from './components/Analytics.jsx';
import AuthCard from './components/AuthCard.jsx';
import { deleteCampaign, generateCampaign, getCampaigns } from './services/api.js';

const features = [
  { icon: WandSparkles, title: 'AI Campaign Generator', text: 'Create focused promotional content for the exact platform you select.' },
  { icon: Languages, title: 'Regional Language Ready', text: 'Generate local-language style captions and voice ad scripts for Bharat-first users.' },
  { icon: Palette, title: 'Poster Preview Studio', text: 'Preview beautiful promo posters before downloading and sharing.' },
  { icon: Megaphone, title: 'Voice Ad Playback', text: 'Play a quick voice-ad script directly from the browser.' },
  { icon: ShieldCheck, title: 'Login Workspace', text: 'Keep campaigns and history connected to your workspace.' },
  { icon: Smartphone, title: 'PWA Experience', text: 'Installable, mobile-first app experience for shop owners.' }
];

export default function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('localbrandai_user') || 'null'));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('localbrandai_theme') !== 'light');
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('localbrandai_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => { if (user) loadCampaigns(); }, [user]);

  async function loadCampaigns() {
    try { const data = await getCampaigns(); setCampaigns(data.campaigns || []); }
    catch (err) { setError(err.message); }
  }

  async function handleGenerate(formData) {
    setLoading(true); setError('');
    try {
      const data = await generateCampaign(formData);
      setCurrentCampaign(data.campaign);
      setCampaigns((prev) => [data.campaign, ...prev.filter((c) => c.id !== data.campaign.id)]);
      setToast(`${data.campaign.input.platform} campaign generated successfully!`);
      setTimeout(() => setToast(''), 2500);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  async function handleDelete(id) {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
      if (currentCampaign?.id === id) setCurrentCampaign(null);
      setToast('Campaign deleted');
      setTimeout(() => setToast(''), 2000);
    } catch (err) { setError(err.message); }
  }

  function logout() {
    localStorage.removeItem('localbrandai_token');
    localStorage.removeItem('localbrandai_user');
    setUser(null);
    setCurrentCampaign(null);
    setCampaigns([]);
  }

  if (!user) return <AuthCard onAuth={setUser} />;

  return <main className="app-shell">
    <div className="ambient ambient-one" />
    <div className="ambient ambient-two" />
    <div className="mesh-grid" />

    <Header user={user} darkMode={darkMode} onToggleTheme={() => setDarkMode((v)=>!v)} onLogout={logout}/>
    {toast && <div className="toast">✅ {toast}</div>}

    <section className="hero glass-hero">
      <div className="hero-copy">
        <p className="eyebrow">AI Growth Strategist • Built for Bharat</p>
        <h1>Local marketing campaigns that feel made by a real strategist.</h1>
        <p className="hero-text">Generate platform-specific captions, regional voice scripts, and poster previews for small Indian businesses — fast, clean, and ready to share.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#create"><BrainCircuit size={18}/> Create Campaign</a>
          <a className="ghost-button" href="#features"><SparkIcon/> View Features</a>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="ai-orbit">
          <span></span><span></span><span></span>
          <div className="ai-core"><WandSparkles size={44}/></div>
        </div>
        <div className="floating-card card-a">Instagram-ready caption</div>
        <div className="floating-card card-b">Poster preview first</div>
        <div className="floating-card card-c">Voice ad script</div>
      </div>
    </section>

    <section className="workspace" id="create">
      <div className="panel form-panel glass-card"><CampaignForm onGenerate={handleGenerate} loading={loading} user={user}/></div>
      <div className="panel result-panel glass-card">{loading ? <Loader /> : currentCampaign ? <ResultCard campaign={currentCampaign} /> : <div className="empty-state"><span>✨</span><h2>Your generated campaign appears here</h2><p>Select Instagram, WhatsApp, or Facebook and generate focused content only for that platform.</p></div>}</div>
    </section>

    {error && <div className="error-box">⚠️ {error}</div>}

    <section className="history-section" id="dashboard">
      <div className="section-title"><p>Dashboard</p><h2>Campaign Analytics</h2></div><Analytics campaigns={campaigns} />
      <div className="section-title compact"><p>History</p><h2>Previous Campaigns</h2></div>
      {campaigns.length === 0 ? <p className="muted">No campaigns yet. Generate your first campaign above.</p> : <div className="history-grid">{campaigns.map((campaign) => <HistoryCard key={campaign.id} campaign={campaign} onDelete={handleDelete} onOpen={setCurrentCampaign} />)}</div>}
    </section>

    <footer className="site-footer" id="features">
      <div className="footer-heading">
        <p className="eyebrow">What makes it useful</p>
        <h2>Not just captions — a mini marketing studio.</h2>
      </div>
      <div className="feature-bento">
        {features.map(({ icon: Icon, title, text }) => <article className="feature-tile glass-card" key={title}><div className="feature-icon"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <div className="footer-bottom"><span>LocalBrandAI • INDIA RUNS 4</span><span>Made for small businesses, shops, cafes, salons and local brands.</span></div>
    </footer>
  </main>;
}

function SparkIcon() { return <Download size={17} />; }
