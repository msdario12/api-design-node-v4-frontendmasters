/** @type {import("express").RequestHandler} */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// For sigin
export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash); // --> Return a promise
};

export const hashPassword = (password) => {
	return bcrypt.hash(password, 5); // --> (password to hash, salt)
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401);
		res.json({ message: 'not authorized' });
		return;
	}

	const [, token] = bearer.split(' '); // "-->Bearer <token>"

	if (!token) {
		res.status(401);
		res.json({ message: 'not valid token' });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (e) {
		console.error(e.stack);
		res.status(401);
		res.json({ message: 'not valid token' });
		return;
	}
};
