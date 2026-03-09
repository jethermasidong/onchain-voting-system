import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: 'No token or invalid format!'});
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch (err) {
        console.error('[auth] Verification Error:', err.message);
        return res.status(401).json({error: 'Invalid or Expired Token!'});
    }
};

const adminOnly = (req, res, next) => {
    if (! req.user || req.user.role !== "admin") {
        return res.status(403).json({message: "Admins only!"});
    }
    next ();
}

export default {auth, adminOnly};