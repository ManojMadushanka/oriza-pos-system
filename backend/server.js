const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection (මෙතන ඔයාගේ Link එක හරියට දාගන්න)
mongoose.connect('mongodb+srv://orizacreation_db_user:manoj123@oriza.i8orqfu.mongodb.net/?appName=oriza')
    .then(() => console.log('✅ Professional Database Connected!'))
    .catch(err => console.error('❌ DB Error:', err));

// 2. Data Models (ස්ක්‍රීන්ෂොට් වලට ගැලපෙන විදියට හැදුවා)

// Product Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,      // විකුණන මිල
    costPrice: Number,  // ගත්තු මිල (ලාභය හදන්න)
    category: String,
    stock: Number
});
const Product = mongoose.model('Product', ProductSchema);

// Order Schema (ඔයා එවපු ස්ක්‍රීන්ෂොට් එකේ තියෙන ඔක්කොම මෙතන තියෙනවා)
const OrderSchema = new mongoose.Schema({
    customerDetails: {
        name: String,
        phone: String,
        address: String
    },
    items: [{
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        costPrice: Number
    }],
    totalAmount: Number,
    deliveryFee: { type: Number, default: 0 },
    status: { type: String, default: 'Preparing' },   // Preparing, Packed, Delivered etc.
    trackingNumber: { type: String, default: '' },    // Courier Number
    paymentMethod: { type: String, default: 'COD' },  // Cash on Delivery / Bank Transfer
    isPaymentReceived: { type: Boolean, default: false }, // සල්ලි හම්බුනාද?
    date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// Expense Schema (වියදම් දාන්න)
const ExpenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now }
});
const Expense = mongoose.model('Expense', ExpenseSchema);

// 3. API Routes

// --- Products ---
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

// --- Orders (දියුණු කරන ලද) ---
app.post('/api/orders', async (req, res) => {
    try {
        const { items, totalAmount, customerDetails, trackingNumber, status, paymentMethod, deliveryFee, isPaymentReceived } = req.body;

        const updatedItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.stock -= item.quantity; // Stock අඩු වෙනවා
                await product.save();
                updatedItems.push({ ...item, costPrice: product.costPrice || 0 }); // Cost එක සේව් වෙනවා
            }
        }

        const newOrder = new Order({
            items: updatedItems, totalAmount, customerDetails, trackingNumber, status, paymentMethod, deliveryFee, isPaymentReceived
        });
        await newOrder.save();
        res.json({ message: "Order Placed Successfully!", orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/orders', async (req, res) => {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
});

// Update Order (Edit)
app.put('/api/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Note: For MVP, we are not recalculating stock on edit to keep it simple.
        // If stock management becomes critical for edits, we can add logic here.

        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- Expenses ---
app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
});

// පරණ app.listen කොටස වෙනුවට මේක දාන්න
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});