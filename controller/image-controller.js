const grid = require("gridfs-stream");
const mongoose = require("mongoose");

const url = "https://blogapp-api-by-abhisek.herokuapp.com";

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
	gfs = grid(conn.db, mongoose.mongo);
	gfs.collection("fs");
});

exports.uploadFile = (request, response) => {
	try {
		if (!request.file) return response.status(404).json("File not found");

		const imageURL = `${url}/file/${request.file.filename}`;
		response.status(200).json(imageURL);
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.getImage = async (request, response) => {
	try {
		const file = await gfs.files.findOne({ filename: request.params.filename });
		const readStream = gfs.createReadStream(file.filename);
		readStream.pipe(response);
	} catch (error) {
		response.status(500).json(error);
	}
};
