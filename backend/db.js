const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tusharcdry:8874271357@cluster0.9sjngvy.mongodb.net/Zwigato?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB is connected');
        const fetched_data = await mongoose.connection.db.collection("fooditems").find({}).toArray();
        const foodcategory= await mongoose.connection.db.collection("foodcategory").find({}).toArray();
        global.fooditems=fetched_data;
        global.foodcategory=foodcategory;
        // console.log(global.fooditems)
        // console.log(fetched_data);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;
