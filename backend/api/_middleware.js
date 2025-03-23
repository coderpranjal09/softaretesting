export default (req, res, next) => {
    try {
      // Validate API key if needed
      if (process.env.NODE_ENV === 'production') {
        const apiKey = req.headers['x-api-key'];
        if (apiKey !== process.env.API_KEY) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };