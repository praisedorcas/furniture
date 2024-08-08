const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://me:1234@cluster0.kmr8vfg.mongodb.net/cargo"
    );
    console.log("connected to db");
  } catch (error) {
    console.error(`connection ${error}`);
  }
};
module.exports = { mongoose, connectToMongoDb };
