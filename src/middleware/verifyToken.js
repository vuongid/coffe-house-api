const  jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, secretKey, (err, data) => {
      if (err) return res.sendStatus(403);
      req.user = data.user;
      next();
    });
}