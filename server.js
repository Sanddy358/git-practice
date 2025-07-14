const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { version } = require('./package.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Git Practice Server</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
                    .container { background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #333; text-align: center; }
                    .endpoints { margin-top: 30px; }
                    .endpoint { background-color: #f8f9fa; padding: 10px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007bff; }
                    code { background-color: #e9ecef; padding: 2px 4px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 Git Practice Server</h1>
                    <p>Welcome to your Node.js server for practicing Git and GitHub!</p>
                    <p>Server is running on port ${PORT}</p>

                    <div class="endpoints">
                        <h3>Available Endpoints:</h3>
                        <div class="endpoint">
                            <strong>GET /</strong> - Home page (this page)
                        </div>
                        <div class="endpoint">
                            <strong>GET /api/hello</strong> - Simple JSON response
                        </div>
                        <div class="endpoint">
                            <strong>GET /api/version</strong> - API version
                        </div>
                        <div class="endpoint">
                            <strong>GET /api/health</strong> - Health check
                        </div>
                    </div>

                    <p><strong>Try these URLs:</strong></p>
                    <ul>
                        <li><a href="/api/hello">http://localhost:${PORT}/api/hello</a></li>
                        <li><a href="/api/version">http://localhost:${PORT}/api/version</a></li>
                        <li><a href="/api/health">http://localhost:${PORT}/api/health</a></li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});

// API Routes
app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello from Git Practice Server!',
        timestamp: new Date().toISOString(),
        version
    });
});

app.get('/api/version', (req, res) => {
    res.json({ version });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints available at http://localhost:${PORT}/api/`);
});

module.exports = app;
