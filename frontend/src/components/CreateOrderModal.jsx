import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateOrderModal({ show, onClose, onOrderSaved }) {
    // Form Data
    const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
    const [trackingNumber, setTrackingNumber] = useState('');
    const [status, setStatus] = useState('Preparing');
    const [paymentMethod, setPaymentMethod] = useState('COD'); // COD or Bank
    const [isPaymentReceived, setIsPaymentReceived] = useState(false);
    const [deliveryFee, setDeliveryFee] = useState(350); // Default fee

    // Cart Data
    const [products, setProducts] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // 1. Modal එක Load වෙනකොට බඩු ලිස්ට් එක ගේන්න
    useEffect(() => {
        if (show) {
            axios.get('http://localhost:5000/api/products')
                .then(res => setProducts(res.data))
                .catch(err => console.error(err));
        }
    }, [show]);

    // 2. බඩු Select කරන Logic එක (Checkbox Click කරාම)
    const toggleProduct = (product) => {
        const exists = selectedItems.find(item => item.productId === product._id);
        if (exists) {
            // තිබේ නම් අයින් කරන්න (Uncheck)
            setSelectedItems(selectedItems.filter(item => item.productId !== product._id));
        } else {
            // නැත්නම් එකතු කරන්න (Check)
            setSelectedItems([...selectedItems, {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1 // Default Qty 1
            }]);
        }
    };

    // 3. මුළු ගණන හැදීම
    const calculateTotal = () => {
        const itemsTotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return itemsTotal + (deliveryFee === 'Free' ? 0 : Number(deliveryFee));
    };

    // 4. Order එක Save කිරීම (Submit)
    const handleSubmit = () => {
        if(selectedItems.length === 0) return alert("Please select at least one product!");
        if(!customer.name) return alert("Please enter customer name!");

        const orderData = {
            customerDetails: customer,
            items: selectedItems,
            totalAmount: calculateTotal(),
            trackingNumber,
            status,
            paymentMethod,
            isPaymentReceived,
            deliveryFee: deliveryFee === 'Free' ? 0 : Number(deliveryFee)
        };

        axios.post('http://localhost:5000/api/orders', orderData)
            .then(res => {
                alert("Order Created Successfully! ✅");
                onOrderSaved(); // List එක Refresh කරන්න
                onClose(); // Modal එක වහන්න
                // Reset Fields
                setSelectedItems([]);
                setCustomer({ name: '', phone: '', address: '' });
            })
            .catch(err => alert("Error creating order: " + err.message));
    };

    if (!show) return null; // Modal එක පෙන්නන්න එපා නම් නවතින්න

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">Create New Order</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            {/* වම් පැත්ත: Customer & Order Details */}
                            <div className="col-md-6 border-end">
                                <h6 className="fw-bold text-muted mb-3">Customer Information</h6>
                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Customer Name *" 
                                        value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Phone Number" 
                                        value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} />
                                </div>
                                <div className="mb-3">
                                    <textarea className="form-control" placeholder="Address" rows="2"
                                        value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})}></textarea>
                                </div>

                                <h6 className="fw-bold text-muted mb-3 mt-4">Order Details</h6>
                                <div className="mb-2">
                                    <label className="small">Tracking Number</label>
                                    <input type="text" className="form-control" placeholder="Ex: 1234567" 
                                        value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label className="small">Status</label>
                                    <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                                        <option>Preparing</option>
                                        <option>Packed</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                    </select>
                                </div>

                                <div className="mt-3 p-3 bg-light rounded">
                                    <label className="fw-bold d-block mb-2">Payment Method</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                                        <label className="form-check-label">Cash on Delivery</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="payment" checked={paymentMethod === 'Bank'} onChange={() => setPaymentMethod('Bank')} />
                                        <label className="form-check-label">Bank Transfer</label>
                                    </div>
                                    <div className="form-check mt-2">
                                        <input className="form-check-input" type="checkbox" checked={isPaymentReceived} onChange={e => setIsPaymentReceived(e.target.checked)} />
                                        <label className="form-check-label text-success fw-bold">Payment Received?</label>
                                    </div>
                                </div>
                            </div>

                            {/* දකුණු පැත්ත: Product Selection */}
                            <div className="col-md-6">
                                <h6 className="fw-bold text-muted mb-3">Select Products</h6>
                                <div className="list-group mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {products.map(product => {
                                        const isSelected = selectedItems.find(i => i.productId === product._id);
                                        return (
                                            <label key={product._id} className={`list-group-item d-flex justify-content-between align-items-center ${isSelected ? 'active' : ''}`}>
                                                <div>
                                                    <input className="form-check-input me-2" type="checkbox" 
                                                        checked={!!isSelected} 
                                                        onChange={() => toggleProduct(product)} />
                                                    {product.name}
                                                </div>
                                                <span className="fw-bold">Rs. {product.price}</span>
                                            </label>
                                        );
                                    })}
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" 
                                            checked={deliveryFee === 'Free'} 
                                            onChange={e => setDeliveryFee(e.target.checked ? 'Free' : 350)} />
                                        <label className="form-check-label">Free Delivery</label>
                                    </div>
                                    <span className="text-muted">{deliveryFee === 'Free' ? 'Rs. 0' : 'Rs. 350'}</span>
                                </div>

                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4>Total Amount:</h4>
                                    <h3 className="text-success fw-bold">Rs. {calculateTotal()}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="button" className="btn btn-danger px-4" onClick={handleSubmit}>Confirm Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}