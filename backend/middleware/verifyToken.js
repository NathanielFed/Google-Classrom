// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Incoming Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded Token:', decoded);

    req.user = {
      id: decoded.userId, // match what you sign in the JWT
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error('❌ JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;