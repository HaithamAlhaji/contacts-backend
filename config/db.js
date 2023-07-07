const mongoose = require("mongoose");

const connect = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING
    );
    console.log(connect.connection.host, connect.connection.name);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { connect };
