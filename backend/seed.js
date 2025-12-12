const mongoose = require('mongoose');

// මෙතනට server.js එකේ තිබුණ Link එකම දාන්න!
mongoose.connect('mongodb+srv://orizacreation_db_user:manoj123@oriza.i8orqfu.mongodb.net/?appName=oriza') 
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err));

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    stock: Number
});
const Product = mongoose.model('Product', ProductSchema);

const products = [
    { name: "A4 Photo Frame (Black)", price: 850, category: "Frames", stock: 50 },
    { name: "10x12 Glass Frame", price: 1200, category: "Glass", stock: 20 },
    { name: "Wooden Key Tag", price: 1550, category: "Gift", stock: 100 },
    { name: "Mug Printing", price: 950, category: "Printing", stock: 200 }
];

const seedDB = async () => {
    await Product.deleteMany({}); // පරණ ඒවා මකන්න
    await Product.insertMany(products); // අලුත් ඒවා දාන්න
    console.log("Sample Products Added!");
    mongoose.connection.close();
};

seedDB();