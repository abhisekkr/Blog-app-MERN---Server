const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");

exports.userSignup = async (request, response) => {
	try {
		const exist = await User.findOne({
			email: request.body.email,
		});
		if (exist) {
			return response.json({ error: "User already have an account" });
		}
		const newUser = new User(request.body);

		await newUser.save((error, user) => {
			if (error) {
				return response.json({
					message: "Not able to save user in DB",
				});
			}
			response.status(200).json({
				message: "Signup Successfull, Please Login",
				username: user.username,
				email: user.email,
				id: user.id,
			});
		});
	} catch (error) {
		console.log("Error :", error.message);
	}
};

exports.userSignin = async (request, response) => {
	const { email, password } = request.body;
	try {
		const user = await User.findOne({ email }, (error, user) => {
			if (error || !user) {
				return response.json({
					error: "USER EMAIL DOESNOT EXIST , PLEASE SIGNUP",
				});
			}

			if (!user.authenticate(password)) {
				return response.json({ error: "EMAIL AND PASSWORD DOESNOT MATCH" });
			}
			//create token
			const token = jwt.sign({ _id: user._id }, process.env.SECRET);

			response.cookie("token", token, { expire: new Date() + 1 });

			const { _id, username, email } = user;
			return response.json({
				token,
				user: { _id, username, email, message: "Login Successfull" },
			});
		});
	} catch (error) {
		console.log("Error", error.messsage);
	}
};

exports.userSignout = async (request, response) => {
	try {
		await response.clearCookie("token");
		response.json({
			message: "User signout successfully",
		});
	} catch (error) {
		console.log("Error", error.message);
	}
};
