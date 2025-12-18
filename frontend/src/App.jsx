import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard'; // ← NEW import
import OrdersPage from './pages/OrdersPage';
import ManagementPage from './pages/ManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';

import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />        {/* ← Home is now Dashboard */}
            <Route path="/orders" element={<OrdersPage />} />  {/* ← Orders moved to /orders */}
            <Route path="/management" element={<ManagementPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;