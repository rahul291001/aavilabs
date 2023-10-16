const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(
      "mongodb+srv://somanath89121:Somu1234@cluster0.qimi6od.mongodb.net/taskk?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Connected to the MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to the MongoDB:", error);
  }
};
