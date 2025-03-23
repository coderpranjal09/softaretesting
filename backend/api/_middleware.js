export default (req, res, next) => {
    try {
        // Allow CORS preflight
        if (req.method === 'OPTIONS') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
            return res.status(200).end();
        }

        // Validate API key in production
        if (process.env.VERCEL_ENV === 'production') {
            const apiKey = req.headers['x-api-key'];
            if (apiKey !== process.env.API_KEY) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};