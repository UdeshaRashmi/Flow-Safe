import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import MonitoringPage from './pages/MonitoringPage';
import MapViewPage from './pages/MapViewPage';
import DrainDetailsPage from './pages/DrainDetailsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/map" element={<MapViewPage />} />
           <Route path="/analytics" element={<DrainDetailsPage />} />

          {/* Other routes will be added in their respective feature branches */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;