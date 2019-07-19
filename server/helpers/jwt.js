const jwt = require('jsonwebtoken');
module.exports = {
	generateToken(payload) {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '16h' });
	},
	verifyToken(token) {
		return jwt.verify(token, process.env.JWT_SECRET);
	}
};