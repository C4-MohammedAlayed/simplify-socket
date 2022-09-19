const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	
	try {
		if (!req.headers.authorization)
			return res.status(403).json({ message: 'forbidden' });

		const token = req.headers.authorization.split(' ').pop();

		const parsedToken = jwt.verify(token, process.env.SECRET);

		console.log("token: "+ token);
		console.log("req.token: "+ req.token);
		console.log("parsedToken: "+ parsedToken);
		req.token = parsedToken;

		next();
	} catch (error) {
		res.status(403).json({ message: error });
	}
};

module.exports = {auth};
