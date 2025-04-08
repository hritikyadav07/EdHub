import jwt from 'jsonwebtoken';
import { User } from '../model/User.js';

// Protect routes

// Middleware to protect routes and check for valid JWT token
// This middleware checks if the user is authenticated by verifying the JWT token
export const protect = async (req, res, next) => {
    let token;

    // Get token from authorization header
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];

    } else if (req.cookies?.token) {
        // Get token from cookie
        token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this token' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
}; 

// Middleware to authorize users based on their roles
// This middleware checks if the user has the required role to access the route
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                error: `User role ${req.user.role} is not authorized to access this route` 
            });
        }
        next();
    };
};


//EVERYTHING WORKING PROPERLY - TESTED WITH POSTMAN