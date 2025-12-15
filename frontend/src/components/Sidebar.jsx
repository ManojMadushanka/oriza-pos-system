import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        📷 Oriza POS
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Dashboard Link - NEW */}
        <Link to="/" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
          <span>📊 Dashboard</span>
        </Link>
        
        {/* Orders Link - Updated path */}
        <Link to="/orders" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
          <span>📦 Orders</span>
        </Link>
        
        <Link to="/management" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
          <span>⚙️ Management</span>
        </Link>
        
        <Link to="/analytics" className="flex items-center p-3 hover:bg-gray-700 rounded-lg transition">
          <span>📈 Analytics</span>
        </Link>
      </nav>

      {/* Profile Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-lg font-bold">
            M
          </div>
          <div>
            <p className="text-sm font-bold">Manoj</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}