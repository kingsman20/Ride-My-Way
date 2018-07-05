import jwt from 'jsonwebtoken';

const verify = {
  jwt: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {    
        if (err) {
          res.status(400).send({ status: 'failed', message: 'Failed to authenticate token' });   
        } else {
          req.decoded = decoded; 
          next();
        }
      });
    } else {
      res.status(400).send({ status: 'failed', message: 'No token provided' });
    }
  },
};

export default verify;
