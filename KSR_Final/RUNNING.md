# Running Frontend + Backend Together

## Quick Start

### Option 1: Run Both Together (Recommended)
```bash
npm run dev
```
This will start:
- **Frontend** on http://localhost:3000
- **Backend** on http://localhost:5000

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm start
```
Runs on http://localhost:3000

**Terminal 2 - Backend:**
```bash
npm run server
```
Runs on http://localhost:5000

## Port Configuration

- **Frontend (React)**: Port 3000
- **Backend (Express API)**: Port 5000
- **Proxy**: Configured to forward `/api/*` requests from frontend to backend

## API Endpoints

Once the backend is running on port 5000:

- `GET http://localhost:5000/api/health` - Health check
- `GET http://localhost:5000/api/kpis` - Get KPI metrics
- `GET http://localhost:5000/api/alerts` - Get anomaly alerts
- `GET http://localhost:5000/api/chart-data` - Get chart data
- `POST http://localhost:5000/api/recommendations` - Generate AI recommendations

## How It Works

1. React app runs on port 3000
2. Express server runs on port 5000
3. The `proxy` setting in package.json allows React to call `/api/*` endpoints
4. React forwards these to `http://localhost:5000/api/*`

## Testing

Open your browser:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health
