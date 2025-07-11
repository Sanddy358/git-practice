# Git Practice Server

A simple Node.js Express server for practicing Git and GitHub workflows.

## 🚀 Features

- Simple REST API with basic endpoints
- JSON responses
- Clean and responsive web interface
- Error handling
- Ready for adding new features

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Assignment-Git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## 🔗 API Endpoints

### GET `/`
- Home page with server information

### GET `/api/hello`
- Simple JSON response with timestamp

## 📝 Example Usage

```bash
# Get hello message
curl http://localhost:3000/api/hello
```

## 🌟 Git Practice Ideas

This server is perfect for practicing Git workflows:

1. **Feature Branches**: Create new endpoints on feature branches
2. **Commits**: Practice making meaningful commits
3. **Pull Requests**: Submit PRs for new features
4. **Merge Conflicts**: Practice resolving conflicts
5. **Git History**: Explore commit history and branching

## 📂 Project Structure

```
Assignment-Git/
├── server.js          # Main server file
├── package.json       # Node.js dependencies
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for practice!

## 📄 License

MIT License - feel free to use this for learning purposes.
