const jwt = require('jsonwebtoken');// JSONwebtoken for token generating

//authentication middleware
module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]; //extracting token from authorization header
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //decoding token
		const userId = decodedToken.userId; //defining decoded token as user id
		if(req.body.userId && req.body.userId !== userId){ //if the request has a user ID and if the request's userId doesn't match the actual user ID
			throw 'User ID non valable'; // throw error
		} else {
			next();
		}

	}catch (error) {
		res.status(401).json({error : error | 'Requête non authentifiée'});
	}
}; 