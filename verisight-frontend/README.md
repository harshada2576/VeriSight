# VeriSight Frontend

**Agentic AI Fake Video Detection System** - A sophisticated React application for deepfake detection with multimodal AI analysis, cryptographic verification packs, and human-in-the-loop review capabilities.

## 🎯 Features

- **🤖 Auto-Analysis**: Upload videos via file or URL for instant AI-powered deepfake detection
- **🔍 Multimodal Detection**: Visual artifacts, audio inconsistencies, temporal anomalies, and face manipulation analysis
- **📜 Cryptographic Verification Packs**: Generate tamper-proof evidence packages with RSA-2048 signatures
- **👥 Human Review Panel**: Optional human expert validation for critical cases
- **📊 Real-time Dashboard**: Track all analysis jobs with detailed statistics and system health monitoring
- **🎨 Cyber-Forensic UI**: Dark theme with neon blue accents, scanning animations, and futuristic HUD styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend repository)

### Installation

1. **Clone and navigate to the project:**

```bash
cd verisight-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment:**

```bash
# Copy the example environment file
copy .env.example .env

# Edit .env and set your backend API URL
# VITE_API_BASE_URL=http://localhost:3000/api
```

4. **Start development server:**

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── api/                    # Backend API integration modules
│   ├── auth.js            # Authentication endpoints
│   ├── ingest.js          # Video upload and ingestion
│   ├── jobs.js            # Job management and statistics
│   ├── review.js          # Human review queue
│   └── verification.js    # Verification pack generation
├── components/
│   ├── ui/                # Base UI components (Button, Input, Card, etc.)
│   ├── layout/            # Layout components (Header, Sidebar, Footer)
│   ├── forms/             # Authentication forms
│   ├── upload/            # Video upload widgets
│   ├── dashboard/         # Dashboard components (stats, job table)
│   ├── evidence/          # Evidence viewers (frames, heatmaps, audio)
│   ├── verification/      # Verification pack components
│   └── review/            # Review panel components
├── context/
│   ├── AuthContext.jsx    # Authentication state management
│   └── ThemeContext.jsx   # Theme and dark mode management
├── pages/
│   ├── public/            # Public pages (Home, About, etc.)
│   ├── auth/              # Authentication pages
│   └── app/               # Protected application pages
├── App.jsx                # Main application component
├── router.jsx             # React Router configuration
└── main.jsx               # Application entry point
```

## 🎨 Design System

### Color Palette

- **Primary Dark**: `#0A1E3F` - Main background
- **Primary Accent**: `#2A6BFF` - Interactive elements
- **Scan Glow**: `#35E2FF` - Highlights and borders
- **Success Neon Mint**: `#3BFFB3` - Success states
- **Neutral Black**: `#0C0C0C` - Card backgrounds
- **Soft Grey Border**: `#D8DDE3` - Text and borders

### Key Features

- Inline CSS with transitions and animations
- Futuristic scanning lines and glowing borders
- Neon gradients and cyber rings
- HUD-style shadows
- 16-24px vertical rhythm
- Smooth rounded cards (8-12px radius)

## 🔌 Backend Integration

All API calls are centralized in the `src/api/` directory. Update `VITE_API_BASE_URL` in `.env` to connect to your backend.

### API Modules

- **auth.js**: Login, register, password reset, user profile
- **ingest.js**: Video file upload with progress, URL submission
- **jobs.js**: Job CRUD, evidence fetching, dashboard statistics
- **review.js**: Review queue management, submission, flagging
- **verification.js**: Verification pack generation, PDF/JSON export

### Authentication

The app uses JWT tokens stored in localStorage. Token is automatically included in all API requests via the `Authorization` header.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📱 Key Pages

### Public Pages

- **Home** (`/`) - Landing page with features and CTA
- **About** (`/about`) - Mission, team, timeline
- **How It Works** (`/how-it-works`) - 6-step detection pipeline
- **Pricing** (`/pricing`) - 3-tier pricing plans
- **Demo** (`/demo`) - Interactive demonstration

### App Pages

- **Dashboard** (`/app/dashboard`) - Overview with stats and recent jobs
- **Upload** (`/app/upload`) - Video submission interface
- **Jobs** (`/app/jobs`) - All jobs list
- **Job Detail** (`/app/jobs/:id`) - ⭐ **MOST IMPORTANT** - Video preview, analysis scores, evidence access
- **Evidence** (`/app/jobs/:id/evidence`) - Detailed evidence viewers
- **Verification Pack** (`/app/jobs/:id/verification`) - Cryptographic verification
- **Review Queue** (`/app/review-queue`) - Human reviewer interface
- **Settings** (`/app/settings`) - User preferences
- **Billing** (`/app/billing`) - Subscription management

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API Base URL
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

This is a closed-source project. For collaboration inquiries, please contact the project maintainers.

---

**Built with React + Vite** | **Styled with Inline CSS** | **Powered by AI**
