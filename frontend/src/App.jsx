import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CampaignForm from './components/CampaignForm.jsx';
import ResultCard from './components/ResultCard.jsx';
import HistoryCard from './components/HistoryCard.jsx';
import Loader from './components/Loader.jsx';
import { deleteCampaign, generateCampaign, getCampaigns } from './services/api.js';

export default function App() {
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  async function loadCampaigns() {
    try {
      const data = await getCampaigns();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function handleGenerate(formData) {
    setLoading(true);
    setError('');
    try {
      const data = await generateCampaign(formData);
      setCurrentCampaign(data.campaign);
      setCampaigns((prev) => [data.campaign, ...prev.filter((c) => c.id !== data.campaign.id)]);
      setToast('Campaign generated successfully!');
      setTimeout(() => setToast(''), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
      if (currentCampaign?.id === id) setCurrentCampaign(null);
      setToast('Campaign deleted');
      setTimeout(() => setToast(''), 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="app-shell">
      <Header />
      {toast && <div className="toast">✅ {toast}</div>}
      <section className="hero">
        <p className="eyebrow">AI for Bharat • Mobile-first SaaS MVP</p>
        <h1>AI Marketing Assistant for Local Indian Businesses</h1>
        <p className="hero-text">
          Generate captions, WhatsApp promos, Instagram posts and regional-language voice ad scripts in seconds.
        </p>
        <div className="hero-badges">
          <span>Regional Languages</span>
          <span>Voice Script</span>
          <span>Campaign History</span>
        </div>
      </section>

      <section className="workspace">
        <div className="panel form-panel">
          <CampaignForm onGenerate={handleGenerate} loading={loading} />
        </div>

        <div className="panel result-panel">
          {loading ? <Loader /> : currentCampaign ? <ResultCard campaign={currentCampaign} /> : (
            <div className="empty-state">
              <span>✨</span>
              <h2>Your generated campaign appears here</h2>
              <p>Fill the form and create a ready-to-share marketing campaign.</p>
            </div>
          )}
        </div>
      </section>

      {error && <div className="error-box">⚠️ {error}</div>}

      <section className="history-section">
        <div className="section-title">
          <p>Dashboard</p>
          <h2>Previous Campaigns</h2>
        </div>
        {campaigns.length === 0 ? (
          <p className="muted">No campaigns yet. Generate your first campaign above.</p>
        ) : (
          <div className="history-grid">
            {campaigns.map((campaign) => (
              <HistoryCard key={campaign.id} campaign={campaign} onDelete={handleDelete} onOpen={setCurrentCampaign} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
