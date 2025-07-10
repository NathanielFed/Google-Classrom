import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔐 Incoming Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('🔍 Extracted Token:', token);
  console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default verifyToken;