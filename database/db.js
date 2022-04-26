const mongoose = require("mongoose");

const Connection = async (username, password) => {
	const URL = `mongodb+srv://${username}:${password}@cluster0.hkab5.mongodb.net/blog?retryWrites=true&w=majority`;
	try {
		await mongoose.connect(URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("DB connected Successfully");
	} catch (error) {
		console.log("Error while connecting to MongoDB", error);
	}
};

module.exports = Connection;
