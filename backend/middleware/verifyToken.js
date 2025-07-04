import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Invalid JWT token:", err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;
