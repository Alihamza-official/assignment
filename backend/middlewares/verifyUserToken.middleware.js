

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // const token = req.headers.auth;

  const token = req.headers.authorization.split(" ")[1];

  
  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: 'access denied',
    });
  }

  try {
    const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET);
    req.user = verified;
    
    req.body.id = verified.id;
    req.body.email = verified.email;

    console.log("Verified ", req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: 'Expired token',
    });
  }
};

