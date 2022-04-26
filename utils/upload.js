const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
	url: `mongodb+srv://abhisek:bittu98@cluster0.hkab5.mongodb.net/blog?retryWrites=true&w=majority`,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (request, file) => {
		const match = ["image/jpeg", "image/png", "image/jpg"];

		if (match.indexOf(file.memeType) === -1) {
			return `${Date.now()}-blog-${file.originalname}`;
		}
		return {
			bucketName: "photos",
			fileName: `${Date.now()}-blog-${file.originalname}`,
		};
	},
});

module.exports = multer({ storage });

// Beacuse we have to upload image , so we will have to do it in chunks
// for that we will need a middleware

//Middleware is called Multer , what Multer does is it processses the formData

//with help of multer we will upload our image to mongoDB
//as we cannot use express functions like save or push to upload image to DB , for image we have to process it

//we will also use GridFs - GridFs storage engine for Multer to store uploaded files directly to MongoDB

//Date.now() function gives value in milliseconds and every time  it changes , so we can use this function where we need some uniques value.

//as this is a multer middleware so we have to pass storage function inside multer
