# LocalBrandAI 🚀

**AI Marketing Assistant for Local Indian Businesses**

LocalBrandAI is a mobile-first full-stack MVP that helps small Indian businesses generate promotional captions, WhatsApp messages, Instagram captions, and regional-language voice advertisement scripts from simple business inputs.

Team: **INDIA RUNS 4**  
Leader: **Om Chaudhari**

---

## Problem Statement

Small local businesses often struggle with digital marketing because they lack writing confidence, design knowledge, language support, and time. Most existing tools are English-first and too complex for local shop owners.

## Solution

LocalBrandAI allows a business owner to enter details like business name, business type, offer, target audience, language, platform, and tone. The system instantly generates ready-to-share marketing content in a simple local style.

---

## Features

- AI-style promotional caption generation
- WhatsApp message generation
- Instagram caption with hashtags
- Regional language style output: English, Hindi, Marathi, Gujarati, Tamil
- Voice advertisement script generation
- Copy buttons for every output
- Share to WhatsApp button
- Campaign history dashboard
- Delete campaign option
- Mobile-first responsive UI
- Clean backend REST API
- JSON file storage for MVP
- Future-ready code comments for real AI, translation, voice generation, MongoDB, and authentication

---

## Tech Stack

### Frontend
- React.js
- Vite
- CSS
- Lucide React icons

### Backend
- Node.js
- Express.js
- JSON file storage
- REST API

### Future Integrations
- OpenAI / Gemini / AWS Bedrock for real AI generation
- Amazon Translate for translation
- Amazon Polly for voice MP3 generation
- Amazon S3 for audio storage
- MongoDB for campaign storage
- Authentication for business accounts

---

## Project Structure

```text
LocalBrandAI-complete/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── CampaignForm.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── HistoryCard.jsx
│   │   │   └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── generateRoutes.js
│   │   └── campaignRoutes.js
│   ├── controllers/
│   │   ├── generateController.js
│   │   └── campaignController.js
│   ├── services/
│   │   ├── aiService.js
│   │   ├── storageService.js
│   │   ├── translationService.js
│   │   └── voiceService.js
│   ├── data/
│   │   └── campaigns.json
│   ├── package.json
│   └── .env.example
│
├── screenshots/
└── README.md
```

---

## API Documentation

### Health Check

```http
GET /health
```

Response:

```json
{
  "status": "ok",
  "service": "LocalBrandAI Backend"
}
```

### Generate Campaign

```http
POST /api/generate
```

Request body:

```json
{
  "businessName": "Raj Fashion",
  "businessType": "Clothing Store",
  "offer": "Flat 50% off on festive wear",
  "targetAudience": "college students and families",
  "language": "Marathi",
  "platform": "WhatsApp",
  "tone": "Festive"
}
```

### Get Campaign History

```http
GET /api/campaigns
```

### Delete Campaign

```http
DELETE /api/campaigns/:id
```

---

## How to Run

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 2. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Suggested Demo Flow

1. Open the frontend.
2. Enter business details.
3. Select Marathi or Hindi.
4. Click **Generate Campaign**.
5. Copy generated WhatsApp message.
6. Share it using the WhatsApp button.
7. Show campaign history dashboard.

---

## Future Scope

- Generate real MP3 voice ads using Amazon Polly
- Generate posters using canvas or image generation API
- Add login and business profiles
- Store campaigns in MongoDB
- Add analytics dashboard
- Add WhatsApp Business API integration
- Add Instagram post scheduler
- Add support for more Indian languages

---

## Hackathon Pitch Line

LocalBrandAI makes AI-powered digital marketing simple, affordable, and local-language friendly for small Indian businesses.
