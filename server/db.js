const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(
      "mongodb+srv://admin:11301130@cluster0.ibfabjp.mongodb.net/Form?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Connected to the MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to the MongoDB:", error);
  }
};
