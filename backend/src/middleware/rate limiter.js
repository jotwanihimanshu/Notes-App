import { ratelimiter } from '../config/upstash.js';


const rateLimiterMiddleware = async (req, res, next) => {
  try {
    // Use IP address as identifier (you can customize this)
    const identifier = req.ip || req.connection.remoteAddress || 'anonymous';
    
    // Check rate limit
    const { success, limit, remaining, reset } = await ratelimiter.limit(identifier);
    
    // Add rate limit headers to response
    res.set({
      'X-RateLimit-Limit': limit,
      'X-RateLimit-Remaining': remaining,
      'X-RateLimit-Reset': new Date(reset),
    });
    
    if (!success) {
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.round((reset - Date.now()) / 1000),
      });
    }
    
    // Continue to next middleware if rate limit check passes
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    // In case of error, allow the request to continue (fail open)
    next();
  }
};


export default rateLimiterMiddleware;