const Post = require("../model/postSchema.js");

exports.createPost = async (request, response) => {
	try {
		const post = await new Post(request.body);
		post.save();

		response.status(200).json("Blog saved successfully");
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.getAllPosts = async (request, response) => {
	let username = request.query.username;
	let categories = request.query.category;
	let posts;
	try {
		if (username) {
			posts = await Post.find({ username: username });
		} else if (categories) {
			posts = await Post.find({ categories: categories });
		} else {
			posts = await Post.find({});
		}
		response.status(200).json(posts);
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.getPost = async (request, response) => {
	try {
		let post = await Post.findById(request.params.id);
		response.status(200).json(post);
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.updatePost = async (request, response) => {
	try {
		await Post.findByIdAndUpdate(request.params.id, { $set: request.body });
		response.status(200).response("Blog updated successfully");
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.deletePost = async (request, response) => {
	try {
		await Post.findByIdAndDelete(request.params.id);
		response.status(200).response("Blog Deleted Successfully");
	} catch (error) {
		response.status(500).json(error);
	}
};
