op# InsightBridge - Complete Project Structure

## 📁 Directory Tree

```
ksr/
│
├── 📂 public/
│   └── index.html                          # HTML entry point with SEO meta tags
│
├── 📂 server/
│   └── server.js                           # Express backend API (Port 5000)
│
├── 📂 src/
│   │
│   ├── 📂 components/
│   │   ├── Dashboard.jsx                   # [DEPRECATED] Original dashboard
│   │   ├── Icons.jsx                       # 18+ professional SVG icons
│   │   ├── Layout.jsx                      # Main layout (sidebar + topbar + content)
│   │   └── TrendChart.jsx                  # Reusable SVG chart component
│   │
│   ├── 📂 data/
│   │   └── mockData.js                     # Comprehensive mock data for all features
│   │
│   ├── 📂 pages/
│   │   ├── DashboardOverview.jsx           # Main dashboard with KPIs & charts
│   │   ├── AnomalyDetection.jsx            # Anomaly detection & filtering
│   │   ├── ContextInput.jsx                # Context input panel with examples
│   │   ├── DecisionRecommendations.jsx     # AI recommendations with confidence
│   │   ├── HistoricalDecisions.jsx         # Past decisions & outcomes
│   │   └── Settings.jsx                    # About page & platform info
│   │
│   ├── 📂 styles/
│   │   ├── dashboard.css                   # Core design system (800+ lines)
│   │   └── pages.css                       # Page-specific styles (1000+ lines)
│   │
│   ├── App.js                              # React Router configuration
│   ├── index.js                            # React entry point
│   ├── App.test.js                         # Test file
│   ├── reportWebVitals.js                  # Performance monitoring
│   └── setupTests.js                       # Test configuration
│
├── 📂 node_modules/                        # Dependencies (auto-generated)
│
├── 📄 package.json                         # Dependencies & scripts
├── 📄 package-lock.json                    # Dependency lock file
│
├── 📄 README.md                            # Main documentation (this file)
├── 📄 QUICKSTART.md                        # Developer quick start guide
├── 📄 BUILD_SUMMARY.md                     # Complete build summary
├── 📄 DESIGN_GUIDE.md                      # Visual design specifications
├── 📄 RUNNING.md                           # How to run frontend + backend
└── 📄 PROJECT_STRUCTURE.md                 # This file
```

---

## 📊 File Breakdown by Category

### Core Application Files (7 files)
1. **src/App.js** - Router configuration with all routes
2. **src/index.js** - React entry point, renders App
3. **src/components/Layout.jsx** - Main layout wrapper
4. **public/index.html** - HTML shell
5. **server/server.js** - Express backend API
6. **package.json** - Project configuration
7. **src/data/mockData.js** - All mock data

### Page Components (6 files)
1. **src/pages/DashboardOverview.jsx** - Main dashboard
2. **src/pages/AnomalyDetection.jsx** - Anomaly detection
3. **src/pages/ContextInput.jsx** - Context input
4. **src/pages/DecisionRecommendations.jsx** - Recommendations
5. **src/pages/HistoricalDecisions.jsx** - Historical decisions
6. **src/pages/Settings.jsx** - About/settings

### Reusable Components (3 files)
1. **src/components/Icons.jsx** - Icon library (18+ icons)
2. **src/components/TrendChart.jsx** - Chart component
3. **src/components/Dashboard.jsx** - [DEPRECATED] Original dashboard

### Styling (2 files)
1. **src/styles/dashboard.css** - Core design system
2. **src/styles/pages.css** - Page-specific styles

### Documentation (5 files)
1. **README.md** - Main documentation
2. **QUICKSTART.md** - Developer guide
3. **BUILD_SUMMARY.md** - Build summary
4. **DESIGN_GUIDE.md** - Design specifications
5. **RUNNING.md** - Running instructions

---

## 🎯 Key Files to Understand

### 1. src/App.js
**Purpose**: Main application router

**Routes**:
- `/` → Redirects to `/dashboard`
- `/dashboard` → DashboardOverview
- `/anomalies` → AnomalyDetection
- `/context` → ContextInput
- `/recommendations` → DecisionRecommendations
- `/history` → HistoricalDecisions
- `/settings` → Settings

### 2. src/components/Layout.jsx
**Purpose**: Consistent layout across all pages

**Contains**:
- Sidebar navigation with active state
- Top bar with search, notifications, user profile
- Content area wrapper

### 3. src/data/mockData.js
**Purpose**: Centralized mock data

**Exports**:
- `kpiMetrics` - 4 KPI cards data
- `performanceTrends` - 6-month trend data
- `departmentData` - 5 departments comparison
- `anomalyAlerts` - 4 anomaly alerts
- `historicalDecisions` - 6 past decisions
- `decisionRecommendations` - 2 AI recommendations
- `contextExamples` - 3 example contexts
- `contextTags` - 12 quick tags

### 4. server/server.js
**Purpose**: Backend API server

**Endpoints**:
- `GET /api/health` - Health check
- `GET /api/kpis` - Get KPI metrics
- `GET /api/alerts` - Get anomaly alerts
- `GET /api/chart-data` - Get chart data
- `POST /api/recommendations` - Generate recommendations

### 5. src/styles/dashboard.css
**Purpose**: Core design system

**Contains**:
- CSS variables (colors, spacing, fonts)
- Component styles (cards, buttons, inputs)
- Layout styles (sidebar, topbar, grid)
- Utility classes
- Responsive breakpoints

### 6. src/styles/pages.css
**Purpose**: Page-specific styles

**Contains**:
- Anomaly detection styles
- Context input styles
- Recommendation styles
- Historical decision styles
- Settings/about styles
- Modal styles

---

## 🔄 Data Flow

```
User Interaction
      ↓
React Component (Page)
      ↓
Mock Data (src/data/mockData.js)
      ↓
Component State
      ↓
Render UI
```

**Future with Real Backend**:
```
User Interaction
      ↓
React Component
      ↓
API Call (Axios)
      ↓
Express Server (server/server.js)
      ↓
Database / External API
      ↓
Response
      ↓
Component State Update
      ↓
Re-render UI
```

---

## 🎨 Component Hierarchy

```
App (Router)
  └── Layout
      ├── Sidebar Navigation
      ├── Top Bar
      └── Content Area
          └── Page Component
              ├── DashboardOverview
              │   ├── KPI Cards
              │   ├── LineChart (Recharts)
              │   ├── BarChart (Recharts)
              │   └── Alert List
              │
              ├── AnomalyDetection
              │   ├── Filter Tabs
              │   ├── Anomaly Cards
              │   └── Modal (optional)
              │
              ├── ContextInput
              │   ├── Textarea
              │   ├── Tag Buttons
              │   ├── Example Cards
              │   └── History List
              │
              ├── DecisionRecommendations
              │   ├── Recommendations Sidebar
              │   └── Recommendation Detail
              │       ├── Confidence Score
              │       ├── Description
              │       ├── Data Factors
              │       ├── Context Factors
              │       ├── Impact Analysis
              │       ├── Risks
              │       └── Alternatives
              │
              ├── HistoricalDecisions
              │   ├── Stats Grid
              │   ├── Filter Tabs
              │   └── Timeline
              │       └── Decision Cards
              │
              └── Settings
                  ├── Hero Section
                  ├── Problem/Solution
                  ├── Features Grid
                  ├── Workflow Steps
                  └── Innovation List
```

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^6.x",
  "recharts": "^2.x",
  "axios": "^1.x",
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

### Development Dependencies
```json
{
  "react-scripts": "5.0.1",
  "concurrently": "^8.2.2"
}
```

---

## 🚀 NPM Scripts

```json
{
  "start": "react-scripts start",           // Frontend only (port 3000)
  "server": "node server/server.js",        // Backend only (port 5000)
  "dev": "concurrently \"npm run server\" \"npm start\"",  // Both together
  "build": "react-scripts build",           // Production build
  "test": "react-scripts test",             // Run tests
  "eject": "react-scripts eject"            // Eject CRA (irreversible)
}
```

---

## 🎯 File Size Overview

### Large Files (500+ lines)
- `src/styles/dashboard.css` - ~800 lines
- `src/styles/pages.css` - ~1000 lines
- `src/data/mockData.js` - ~400 lines
- `README.md` - ~500 lines

### Medium Files (200-500 lines)
- `src/pages/DecisionRecommendations.jsx` - ~250 lines
- `src/pages/HistoricalDecisions.jsx` - ~280 lines
- `src/pages/Settings.jsx` - ~300 lines
- `src/components/Icons.jsx` - ~200 lines

### Small Files (< 200 lines)
- `src/pages/DashboardOverview.jsx` - ~180 lines
- `src/pages/AnomalyDetection.jsx` - ~170 lines
- `src/pages/ContextInput.jsx` - ~190 lines
- `src/components/Layout.jsx` - ~120 lines
- `src/components/TrendChart.jsx` - ~120 lines
- `server/server.js` - ~120 lines
- `src/App.js` - ~25 lines

---

## 🔍 Quick Navigation Guide

### To Add a New Page:
1. Create `src/pages/YourPage.jsx`
2. Add route in `src/App.js`
3. Add nav item in `src/components/Layout.jsx`
4. Add styles in `src/styles/pages.css`
5. Add mock data in `src/data/mockData.js` (if needed)

### To Modify Styling:
- **Global styles**: `src/styles/dashboard.css`
- **Page-specific**: `src/styles/pages.css`
- **CSS variables**: Top of `dashboard.css`

### To Update Mock Data:
- Edit `src/data/mockData.js`
- All components import from this single source

### To Add API Endpoints:
- Edit `server/server.js`
- Add new route handlers
- Update frontend to call new endpoints

---

## ✅ Checklist for Deployment

- [ ] Update `package.json` version
- [ ] Run `npm run build`
- [ ] Test production build locally
- [ ] Configure environment variables
- [ ] Set up backend database
- [ ] Deploy backend to cloud (Heroku, AWS, etc.)
- [ ] Deploy frontend to hosting (Netlify, Vercel, etc.)
- [ ] Configure CORS for production
- [ ] Set up monitoring and logging
- [ ] Create backup strategy

---

**Last Updated**: February 2026  
**Total Files**: 30+  
**Total Lines of Code**: ~5000+  
**Status**: Production Demo Ready ✅
