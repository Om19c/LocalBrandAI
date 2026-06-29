import { useState } from 'react';
import { WandSparkles } from 'lucide-react';

const initialState = {
  businessName: 'Raj Fashion',
  businessType: 'Clothing Store',
  offer: 'Flat 50% off on festive wear',
  targetAudience: 'college students and families',
  language: 'Marathi',
  platform: 'WhatsApp',
  tone: 'Festive'
};

export default function CampaignForm({ onGenerate, loading }) {
  const [form, setForm] = useState(initialState);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onGenerate(form);
  }

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>Create Campaign</h2>
        <p>Enter simple business details. LocalBrandAI will do the marketing writing.</p>
      </div>

      <label>Business Name<input name="businessName" value={form.businessName} onChange={updateField} placeholder="e.g. Raj Fashion" required /></label>
      <label>Business Type<input name="businessType" value={form.businessType} onChange={updateField} placeholder="e.g. Salon, Café, Grocery" required /></label>
      <label>Offer / Promotion<textarea name="offer" value={form.offer} onChange={updateField} placeholder="e.g. Buy 1 Get 1 Free" required /></label>
      <label>Target Audience<input name="targetAudience" value={form.targetAudience} onChange={updateField} placeholder="e.g. students, families" required /></label>

      <div className="two-col">
        <label>Language<select name="language" value={form.language} onChange={updateField}><option>English</option><option>Hindi</option><option>Marathi</option><option>Gujarati</option><option>Tamil</option></select></label>
        <label>Platform<select name="platform" value={form.platform} onChange={updateField}><option>WhatsApp</option><option>Instagram</option><option>Facebook</option></select></label>
      </div>

      <label>Tone<select name="tone" value={form.tone} onChange={updateField}><option>Friendly</option><option>Professional</option><option>Festive</option><option>Urgent</option></select></label>

      <button className="primary-button" type="submit" disabled={loading}>
        <WandSparkles size={18} /> {loading ? 'Generating...' : 'Generate Campaign'}
      </button>
    </form>
  );
}
