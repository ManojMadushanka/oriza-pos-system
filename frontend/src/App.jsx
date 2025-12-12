import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrdersPage from './pages/OrdersPage';
import ManagementPage from './pages/ManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;