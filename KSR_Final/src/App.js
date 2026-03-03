import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import JobTypeSelection from './pages/JobTypeSelection';
import JobDashboard from './pages/JobDashboard';
import DashboardOverview from './pages/DashboardOverview';
import AnomalyDetection from './pages/AnomalyDetection';
import ContextInput from './pages/ContextInput';
import DecisionRecommendations from './pages/DecisionRecommendations';
import HistoricalDecisions from './pages/HistoricalDecisions';
import PerformanceAnalysis from './pages/PerformanceAnalysis';
import IssueTracking from './pages/IssueTracking';
import DecisionIntelligence from './pages/DecisionIntelligence';
import Settings from './pages/Settings';
import './styles/dashboard.css';
import './styles/pages.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <ErrorBoundary>
      <Layout key={location.pathname}>{children}</Layout>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-selection" element={<ProtectedRoute><JobTypeSelection /></ProtectedRoute>} />
        <Route path="/dashboard/:jobType" element={<ProtectedRoute><LayoutWrapper><JobDashboard /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><LayoutWrapper><JobDashboard /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/anomalies" element={<ProtectedRoute><LayoutWrapper><AnomalyDetection /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/context" element={<ProtectedRoute><LayoutWrapper><ContextInput /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><LayoutWrapper><DecisionRecommendations /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><LayoutWrapper><DecisionIntelligence /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/analysis" element={<ProtectedRoute><LayoutWrapper><PerformanceAnalysis /></LayoutWrapper></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><LayoutWrapper><Settings /></LayoutWrapper></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
