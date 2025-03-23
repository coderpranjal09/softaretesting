import { getDriverNumber } from '../db';

export default async (req, res) => {
    const { id } = req.query;
    
    try {
        const vehicle = vehicleData.find(v => 
            v.vehicleID.toUpperCase() === id.toUpperCase()
        );

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        
        res.json({
            ...vehicle,
            // Add additional security headers
            headers: {
                'Content-Security-Policy': "default-src 'self'",
                'X-Content-Type-Options': 'nosniff'
            }
        });

    } catch (error) {
        res.status(500).json({ 
            error: 'Server error',
            details: error.message
        });
    }
};