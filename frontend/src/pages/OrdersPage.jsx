import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateOrderModal from '../components/CreateOrderModal';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // Orders ලෝඩ් කරගැනීම
    const fetchOrders = () => {
        axios.get('http://localhost:5000/api/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>📦 Orders Dashboard</h2>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    + New Order
                </button>
            </div>

            {/* Orders Table */}
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td><small className="text-muted">#{order._id.slice(-6)}</small></td>
                                    <td>
                                        <div className="fw-bold">{order.customerDetails?.name}</div>
                                        <small className="text-muted">{order.customerDetails?.phone}</small>
                                    </td>
                                    <td>
                                        <span className={`badge bg-${order.status === 'Delivered' ? 'success' : order.status === 'Packed' ? 'info' : 'warning'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="fw-bold">Rs. {order.totalAmount}</td>
                                    <td>
                                        {order.paymentMethod === 'COD' ? <span className="badge bg-dark">COD</span> : <span className="badge bg-primary">Bank</span>}
                                        {order.isPaymentReceived && <span className="ms-1">✅</span>}
                                    </td>
                                    <td>{order.items.length} Items</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* අර අපි හදපු Modal එක මෙතන සම්බන්ධ කරනවා */}
            <CreateOrderModal 
                show={showModal} 
                onClose={() => setShowModal(false)} 
                onOrderSaved={fetchOrders} 
            />
        </div>
    );
}