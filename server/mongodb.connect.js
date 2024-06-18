require('dotenv').config()

const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@atlascluster.ru65j9u.mongodb.net/" + process.env.MONGO_DB_NAME + "?retryWrites=true&w=majority&appName=AtlasCluster";
// const mongoURI = "mongodb+srv://jesusenriquecarrero:Jesusjeco19*@atlascluster.ru65j9u.mongodb.net/Mainproca?retryWrites=true&w=majority&appName=AtlasCluster";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(collections);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;