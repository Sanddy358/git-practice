const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        background-color: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    .endpoints {
                        margin-top: 30px;
                    }
                    .endpoint {
                        background-color: #f8f9fa;
                        padding: 10px;
                        margin: 10px 0;
                        border-radius: 5px;
                        border-left: 4px solid #007bff;
                    }
                    code {
                        background-color: #e9ecef;
                        padding: 2px 4px;
                        border-radius: 3px;
                    }
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
                            <strong>GET /api/users</strong> - Get all users
                        </div>
                        <div class="endpoint">
                            <strong>POST /api/users</strong> - Create a new user
                        </div>
                        <div class="endpoint">
                            <strong>GET /api/users/:id</strong> - Get user by ID
                        </div>
                        <div class="endpoint">
                            <strong>PUT /api/users/:id</strong> - Update user by ID
                        </div>
                        <div class="endpoint">
                            <strong>DELETE /api/users/:id</strong> - Delete user by ID
                        </div>
                    </div>
                    
                    <p><strong>Try these URLs:</strong></p>
                    <ul>
                        <li><a href="/api/hello">http://localhost:${PORT}/api/hello</a></li>
                        <li><a href="/api/users">http://localhost:${PORT}/api/users</a></li>
                    </ul>
                </div>
            </body>
        </html>
    `);
});

// API Routes
// Sample users data
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.get('/api/hello', (req, res) => {
    res.json({
        message: 'Hello from Git Practice Server!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        data: users,
        count: users.length
    });
});

// Create a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and email are required'
        });
    }
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists'
        });
    }
    
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name,
        email
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        data: newUser,
        message: 'User created successfully'
    });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid user ID'
        });
    }
    
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

// Update user by ID
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid user ID'
        });
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    // Check if email already exists (excluding current user)
    if (email && users.some(user => user.email === email && user.id !== userId)) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists'
        });
    }
    
    // Update user fields
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    
    res.json({
        success: true,
        data: users[userIndex],
        message: 'User updated successfully'
    });
});

// Delete user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid user ID'
        });
    }
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'User not found'
        });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
        success: true,
        data: deletedUser,
        message: 'User deleted successfully'
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
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 API endpoints available at http://localhost:${PORT}/api/`);
});

module.exports = app;
