import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    preparing: 0,
    packed: 0,
    shipped: 0,
    delivered: 0,
    cod: 0,
    bank: 0,
    paymentReceived: 0
  });

  const [loading, setLoading] = useState(true);

  // Fetch orders and calculate statistics
  useEffect(() => {
    axios.get('https://oriza-pos-system.onrender.com/api/orders')
      .then(res => {
        const orders = res.data;
        
        setStats({
          total: orders.length,
          preparing: orders.filter(o => o.status === 'Preparing').length,
          packed: orders.filter(o => o.status === 'Packed').length,
          shipped: orders.filter(o => o.status === 'Shipped').length,
          delivered: orders.filter(o => o.status === 'Delivered').length,
          cod: orders.filter(o => o.paymentMethod === 'COD').length,
          bank: orders.filter(o => o.paymentMethod === 'Bank').length,
          paymentReceived: orders.filter(o => o.isPaymentReceived).length
        });
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Order Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* All Orders Card */}
        <StatCard
          icon="📦"
          title="All Orders"
          count={stats.total}
          bgColor="bg-blue-50"
          iconBg="bg-blue-100"
          textColor="text-blue-600"
        />

        {/* Preparing Orders */}
        <StatCard
          icon="⏳"
          title="Preparing"
          count={stats.preparing}
          bgColor="bg-yellow-50"
          iconBg="bg-yellow-100"
          textColor="text-yellow-600"
        />

        {/* Packed Orders */}
        <StatCard
          icon="📦"
          title="Packed"
          count={stats.packed}
          bgColor="bg-purple-50"
          iconBg="bg-purple-100"
          textColor="text-purple-600"
        />

        {/* Shipped Orders */}
        <StatCard
          icon="🚚"
          title="Shipped"
          count={stats.shipped}
          bgColor="bg-orange-50"
          iconBg="bg-orange-100"
          textColor="text-orange-600"
        />

        {/* Delivered Orders */}
        <StatCard
          icon="✅"
          title="Delivered"
          count={stats.delivered}
          bgColor="bg-green-50"
          iconBg="bg-green-100"
          textColor="text-green-600"
        />

        {/* COD Orders */}
        <StatCard
          icon="💵"
          title="Cash on Delivery"
          count={stats.cod}
          bgColor="bg-indigo-50"
          iconBg="bg-indigo-100"
          textColor="text-indigo-600"
        />

        {/* Bank Transfer Orders */}
        <StatCard
          icon="🏦"
          title="Bank Transfer"
          count={stats.bank}
          bgColor="bg-pink-50"
          iconBg="bg-pink-100"
          textColor="text-pink-600"
        />

        {/* Payment Received */}
        <StatCard
          icon="💰"
          title="Payment Received"
          count={stats.paymentReceived}
          bgColor="bg-teal-50"
          iconBg="bg-teal-100"
          textColor="text-teal-600"
        />
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Create New Order
          </button>
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Card Component
function StatCard({ icon, title, count, bgColor, iconBg, textColor }) {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition`}>
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
          {icon}
        </div>
        
        {/* Text */}
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-4xl font-bold ${textColor}`}>{count}</p>
        </div>
      </div>
    </div>
  );
}