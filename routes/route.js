const express = require("express");
const {
	userSignin,
	userSignup,
	userSignout,
} = require("../controller/user-controller.js");
const {
	createPost,
	getAllPosts,
	getPost,
	updatePost,
	deletePost,
} = require("../controller/post-controller.js");
const { uploadFile, getImage } = require("../controller/image-controller.js");
const {
	newComment,
	getComments,
	deleteComment,
} = require("../controller/comment-controller.js");
const upload = require("../utils/upload.js");

const Router = express.Router();

Router.post("/signup", userSignup);
Router.post("/signin", userSignin);
Router.get("/signout", userSignout);

Router.post("/create", createPost);
Router.post("/update/:id", updatePost);
Router.delete("/delete/:id", deletePost);

Router.get("/posts", getAllPosts);
Router.get("/post/:id", getPost);

Router.post("/file/upload", upload.single("file"), uploadFile);
Router.get("/file/:filename", getImage);

Router.post("/comment/new", newComment);
Router.get("/comments/:id", getComments);
Router.delete("/comment/delete/:id", deleteComment);

module.exports = Router;
