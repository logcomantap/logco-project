const User = require('../models/user');
const { compareHash } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
class UserController {
	static register(req, res, next) {
		const { username, email, password } = req.body;
		let newUser = { username, email, password };
		User.create(newUser)
			.then((user) => {
				res.status(201).json({ message: 'register completed.' });
			})
			.catch(next);
	}
	static login(req, res, next) {
		const { email, password } = req.body;
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					throw new Error('invalid email / password')
				} else {
					if (compareHash(password, user.password)) {
						let payload = {
							id: user._id,
							username: user.username,
							email: user.email
						};
						let token = generateToken(payload);
						res.status(200).json(token);
					} else {
						throw new Error('invalid username / password')
					}
				}
			})
			.catch(next);
	}
}
module.exports = UserController;
